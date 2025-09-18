import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { Company } from '@/models/Company';
import { User } from '@/models/User';
import { verifyJwt } from '@/lib/auth';
import { checkRole } from '@/lib/rbac';
import { rateLimit } from '@/lib/rate-limit';

const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().max(100).optional(),
  size: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']).optional(),
  location: z.object({
    country: z.string().min(1).max(100),
    city: z.string().max(100).optional(),
    address: z.string().max(500).optional()
  }),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().max(20).optional()
  })
});

const updateCompanySchema = createCompanySchema.partial();

// GET /api/v1/companies - List companies (admin only)
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

    // Check if user has admin role
    if (!checkRole(payload.roles, ['admin'])) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const companies = await Company.find({ isActive: true })
      .populate('adminUsers', 'email roles')
      .populate('hiringManagers', 'email roles')
      .populate('financeUsers', 'email roles')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Company.countDocuments({ isActive: true });

    return NextResponse.json({
      companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('GET /api/v1/companies error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/v1/companies - Create company (admin only)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP, 5, 300)) { // 5 requests per 5 minutes
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

    // Check if user has admin role
    if (!checkRole(payload.roles, ['admin'])) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createCompanySchema.parse(body);

    await connectDB();

    // Check if company with same name or email already exists
    const existingCompany = await Company.findOne({
      $or: [
        { name: validatedData.name },
        { 'contactInfo.email': validatedData.contactInfo.email }
      ],
      isActive: true
    });

    if (existingCompany) {
      return NextResponse.json({ 
        error: 'Company with this name or email already exists' 
      }, { status: 409 });
    }

    const company = new Company(validatedData);
    await company.save();

    return NextResponse.json({
      message: 'Company created successfully',
      company: {
        id: company._id,
        name: company.name,
        description: company.description,
        website: company.website,
        industry: company.industry,
        size: company.size,
        location: company.location,
        contactInfo: company.contactInfo,
        isActive: company.isActive,
        createdAt: company.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('POST /api/v1/companies error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
