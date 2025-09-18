import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Task } from '@/models/Task';
import { Company } from '@/models/Company';
import { verifyJwt } from '@/lib/auth';
import { checkRole } from '@/lib/rbac';
import { rateLimit } from '@/lib/rate-limit';

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  category: z.string().min(1).max(100).optional(),
  subcategory: z.string().max(100).optional(),
  skills: z.array(z.string().max(50)).min(1).max(20).optional(),
  budget: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
    currency: z.enum(['EUR', 'USD', 'GBP']).optional()
  }).optional(),
  duration: z.object({
    value: z.number().min(1).optional(),
    unit: z.enum(['hours', 'days', 'weeks', 'months']).optional()
  }).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  status: z.enum(['draft', 'published', 'in_progress', 'completed', 'cancelled']).optional(),
  coverageWindows: z.array(z.object({
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    timezone: z.string().default('UTC'),
    isActive: z.boolean().default(true)
  })).optional(),
  requirements: z.object({
    experience: z.enum(['entry', 'intermediate', 'senior', 'expert']).optional(),
    availability: z.string().min(1).max(200).optional(),
    location: z.object({
      type: z.enum(['remote', 'onsite', 'hybrid']),
      country: z.string().max(100).optional(),
      city: z.string().max(100).optional()
    }).optional()
  }).optional(),
  attachments: z.array(z.string()).optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  assignedTo: z.string().optional()
});

// GET /api/v1/tasks/[id] - Get task by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    await connectDB();

    const task = await Task.findById(params.id)
      .populate('company', 'name industry location contactInfo')
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email skills experience');

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check if user has access to this task
    const hasAccess = 
      checkRole(payload.roles, ['admin']) ||
      task.createdBy._id.toString() === payload.userId ||
      task.assignedTo?._id.toString() === payload.userId ||
      (task.company && checkRole(payload.roles, ['company_org_admin', 'company_hiring_manager', 'company_finance']));

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied to this task' }, { status: 403 });
    }

    return NextResponse.json({ task });

  } catch (error) {
    console.error('GET /api/v1/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/v1/tasks/[id] - Update task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP, 15, 300)) { // 15 requests per 5 minutes
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    await connectDB();

    const task = await Task.findById(params.id).populate('company');
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check permissions
    const isAdmin = checkRole(payload.roles, ['admin']);
    const isCreator = task.createdBy.toString() === payload.userId;
    const isAssigned = task.assignedTo?.toString() === payload.userId;
    const isCompanyMember = task.company && (
      checkRole(payload.roles, ['company_org_admin', 'company_hiring_manager']) &&
      (task.company as any).adminUsers?.some((user: any) => user.toString() === payload.userId) ||
      (task.company as any).hiringManagers?.some((user: any) => user.toString() === payload.userId)
    );

    if (!isAdmin && !isCreator && !isAssigned && !isCompanyMember) {
      return NextResponse.json({ error: 'Insufficient permissions to update this task' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateTaskSchema.parse(body);

    // Convert coverage windows dates if provided
    if (validatedData.coverageWindows) {
      validatedData.coverageWindows = validatedData.coverageWindows.map(window => ({
        ...window,
        startTime: new Date(window.startTime),
        endTime: new Date(window.endTime)
      }));
    }

    // Handle status changes
    if (validatedData.status === 'published' && task.status === 'draft') {
      validatedData.publishedAt = new Date();
    }
    if (validatedData.status === 'completed') {
      validatedData.completedAt = new Date();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      { ...validatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('company', 'name industry location')
     .populate('createdBy', 'firstName lastName email')
     .populate('assignedTo', 'firstName lastName email');

    return NextResponse.json({
      message: 'Task updated successfully',
      task: updatedTask
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('PUT /api/v1/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/v1/tasks/[id] - Soft delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    await connectDB();

    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check permissions - only admin, creator, or company admin can delete
    const isAdmin = checkRole(payload.roles, ['admin']);
    const isCreator = task.createdBy.toString() === payload.userId;
    const isCompanyAdmin = checkRole(payload.roles, ['company_org_admin']) && 
      task.company && (task.company as any).adminUsers?.some((user: any) => user.toString() === payload.userId);

    if (!isAdmin && !isCreator && !isCompanyAdmin) {
      return NextResponse.json({ error: 'Insufficient permissions to delete this task' }, { status: 403 });
    }

    await Task.findByIdAndUpdate(
      params.id,
      { isActive: false, updatedAt: new Date() }
    );

    return NextResponse.json({
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('DELETE /api/v1/tasks/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
