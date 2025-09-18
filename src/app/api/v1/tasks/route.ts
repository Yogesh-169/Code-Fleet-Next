import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Task } from '@/models/Task';
import { Company } from '@/models/Company';
import { verifyJwt } from '@/lib/auth';
import { checkRole } from '@/lib/rbac';
import { rateLimit } from '@/lib/rate-limit';

const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: z.string().min(1).max(100),
  subcategory: z.string().max(100).optional(),
  skills: z.array(z.string().max(50)).min(1).max(20),
  budget: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.enum(['EUR', 'USD', 'GBP']).default('EUR')
  }),
  duration: z.object({
    value: z.number().min(1),
    unit: z.enum(['hours', 'days', 'weeks', 'months'])
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  company: z.string().min(1),
  coverageWindows: z.array(z.object({
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    timezone: z.string().default('UTC'),
    isActive: z.boolean().default(true)
  })).min(1),
  requirements: z.object({
    experience: z.enum(['entry', 'intermediate', 'senior', 'expert']),
    availability: z.string().min(1).max(200),
    location: z.object({
      type: z.enum(['remote', 'onsite', 'hybrid']),
      country: z.string().max(100).optional(),
      city: z.string().max(100).optional()
    }).optional()
  }),
  attachments: z.array(z.string()).optional(),
  tags: z.array(z.string().max(30)).max(10).optional()
});

// GET /api/v1/tasks - List tasks with filtering
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = { isActive: true, status: { $in: ['published', 'in_progress'] } };

    // Category filter
    if (searchParams.get('category')) {
      filter.category = searchParams.get('category');
    }

    // Skills filter
    if (searchParams.get('skills')) {
      const skills = searchParams.get('skills')?.split(',');
      filter.skills = { $in: skills };
    }

    // Budget range filter
    if (searchParams.get('minBudget')) {
      filter['budget.min'] = { $gte: parseInt(searchParams.get('minBudget')!) };
    }
    if (searchParams.get('maxBudget')) {
      filter['budget.max'] = { $lte: parseInt(searchParams.get('maxBudget')!) };
    }

    // Experience level filter
    if (searchParams.get('experience')) {
      filter['requirements.experience'] = searchParams.get('experience');
    }

    // Location filter
    if (searchParams.get('locationType')) {
      filter['requirements.location.type'] = searchParams.get('locationType');
    }

    // Search text
    if (searchParams.get('search')) {
      filter.$text = { $search: searchParams.get('search')! };
    }

    const tasks = await Task.find(filter)
      .populate('company', 'name industry location')
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    return NextResponse.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('GET /api/v1/tasks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/tasks - Create task
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP, 10, 300)) { // 10 requests per 5 minutes
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

    // Check if user has appropriate role to create tasks
    if (!checkRole(payload.roles, ['admin', 'company_org_admin', 'company_hiring_manager'])) {
      return NextResponse.json({ error: 'Insufficient permissions to create tasks' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createTaskSchema.parse(body);

    await connectDB();

    // Verify company exists and user has access to it
    const company = await Company.findById(validatedData.company);
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Check if user belongs to this company (unless admin)
    if (!checkRole(payload.roles, ['admin'])) {
      const userBelongsToCompany = 
        company.adminUsers.some(user => user.toString() === payload.userId) ||
        company.hiringManagers.some(user => user.toString() === payload.userId);

      if (!userBelongsToCompany) {
        return NextResponse.json({ error: 'Access denied to this company' }, { status: 403 });
      }
    }

    // Convert coverage windows dates
    const coverageWindows = validatedData.coverageWindows.map(window => ({
      ...window,
      startTime: new Date(window.startTime),
      endTime: new Date(window.endTime)
    }));

    const task = new Task({
      ...validatedData,
      createdBy: payload.userId,
      coverageWindows
    });

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate('company', 'name industry location')
      .populate('createdBy', 'firstName lastName email');

    return NextResponse.json({
      message: 'Task created successfully',
      task: populatedTask
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('POST /api/v1/tasks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
