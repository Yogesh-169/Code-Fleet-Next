import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Company } from '@/models/Company';
import { verifyJwt } from '@/lib/auth';
import { checkRole } from '@/lib/rbac';
import { rateLimit } from '@/lib/rate-limit';

const updateCompanySchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().max(100).optional(),
  size: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']).optional(),
  location: z.object({
    country: z.string().min(1).max(100).optional(),
    city: z.string().max(100).optional(),
    address: z.string().max(500).optional()
  }).optional(),
  contactInfo: z.object({
    email: z.string().email().optional(),
    phone: z.string().max(20).optional()
  }).optional(),
  isActive: z.boolean().optional()
});

// GET /api/v1/companies/[id] - Get company by ID
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

    // Check if user has appropriate role
    if (!checkRole(payload.roles, ['admin', 'company_org_admin', 'company_hiring_manager', 'company_finance'])) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
    }

    await connectDB();

    const company = await Company.findById(params.id)
      .populate('adminUsers', 'email roles')
      .populate('hiringManagers', 'email roles')
      .populate('financeUsers', 'email roles');

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // If user is not admin, check if they belong to this company
    if (!checkRole(payload.roles, ['admin'])) {
      const userBelongsToCompany = 
        company.adminUsers.some(user => user._id.toString() === payload.userId) ||
        company.hiringManagers.some(user => user._id.toString() === payload.userId) ||
        company.financeUsers.some(user => user._id.toString() === payload.userId);

      if (!userBelongsToCompany) {
        return NextResponse.json({ error: 'Access denied to this company' }, { status: 403 });
      }
    }

    return NextResponse.json({ company });

  } catch (error) {
    console.error('GET /api/v1/companies/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/v1/companies/[id] - Update company
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
    }

    await connectDB();

    const company = await Company.findById(params.id);
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Check permissions
    const isAdmin = checkRole(payload.roles, ['admin']);
    const isCompanyAdmin = checkRole(payload.roles, ['company_org_admin']) && 
      company.adminUsers.some(user => user.toString() === payload.userId);

    if (!isAdmin && !isCompanyAdmin) {
      return NextResponse.json({ error: 'Insufficient permissions to update company' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateCompanySchema.parse(body);

    // Check for duplicate name/email if updating those fields
    if (validatedData.name || validatedData.contactInfo?.email) {
      const duplicateQuery: any = { _id: { $ne: params.id }, isActive: true };
      
      if (validatedData.name) {
        duplicateQuery.name = validatedData.name;
      }
      if (validatedData.contactInfo?.email) {
        duplicateQuery['contactInfo.email'] = validatedData.contactInfo.email;
      }

      const existingCompany = await Company.findOne(duplicateQuery);
      if (existingCompany) {
        return NextResponse.json({ 
          error: 'Company with this name or email already exists' 
        }, { status: 409 });
      }
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      params.id,
      { ...validatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('adminUsers', 'email roles')
     .populate('hiringManagers', 'email roles')
     .populate('financeUsers', 'email roles');

    return NextResponse.json({
      message: 'Company updated successfully',
      company: updatedCompany
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('PUT /api/v1/companies/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/v1/companies/[id] - Soft delete company (admin only)
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

    // Only admin can delete companies
    if (!checkRole(payload.roles, ['admin'])) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
    }

    await connectDB();

    const company = await Company.findByIdAndUpdate(
      params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Company deleted successfully'
    });

  } catch (error) {
    console.error('DELETE /api/v1/companies/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
