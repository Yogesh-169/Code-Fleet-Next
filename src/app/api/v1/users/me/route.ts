import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyJwt } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  phone: z.string().max(20).optional(),
  bio: z.string().max(1000).optional(),
  skills: z.array(z.string().max(50)).max(20).optional(),
  experience: z.enum(['entry', 'intermediate', 'senior', 'expert']).optional(),
  location: z.object({
    country: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    timezone: z.string().max(50).optional()
  }).optional(),
  availability: z.object({
    status: z.enum(['available', 'busy', 'unavailable']).optional(),
    hoursPerWeek: z.number().min(1).max(168).optional(),
    noticePeriod: z.string().max(100).optional()
  }).optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    portfolio: z.string().url().optional().or(z.literal(''))
  }).optional()
});

// GET /api/v1/users/me - Get current user profile
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

    const user = await User.findById(payload.userId).select('-passwordHash -emailVerificationToken -emailVerificationExpires');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
        availability: user.availability,
        socialLinks: user.socialLinks,
        roles: user.roles,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('GET /api/v1/users/me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/v1/users/me - Update current user profile
export async function PUT(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP, 20, 300)) { // 20 requests per 5 minutes
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

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    await connectDB();

    const user = await User.findByIdAndUpdate(
      payload.userId,
      { ...validatedData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-passwordHash -emailVerificationToken -emailVerificationExpires');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        location: user.location,
        availability: user.availability,
        socialLinks: user.socialLinks,
        roles: user.roles,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.errors 
      }, { status: 400 });
    }

    console.error('PUT /api/v1/users/me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
