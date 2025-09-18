import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyJwt } from '@/lib/auth';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        error: 'Authorization header missing or invalid'
      }, { status: 401 });
    }

    // Extract token
    const token = authHeader.substring(7);
    
    // Verify JWT token
    const decoded = verifyJwt(token);
    if (!decoded) {
      return NextResponse.json({
        error: 'Invalid or expired token'
      }, { status: 401 });
    }

    // Get user from database
    const user = await User.findById(decoded.userId).select('-passwordHash -emailVerificationToken -passwordResetToken -refreshTokens');
    
    if (!user) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 404 });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return NextResponse.json({
        error: 'Account is not active'
      }, { status: 403 });
    }

    // Return user information
    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        status: user.status,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        // Type-specific information
        companyInfo: user.userType === 'company' ? user.companyInfo : undefined,
        educationalInstituteInfo: user.userType === 'educational_institute' ? user.educationalInstituteInfo : undefined,
        freelancerInfo: user.userType === 'freelancer' ? user.freelancerInfo : undefined,
        // Preferences
        language: user.preferences?.language,
        timezone: user.preferences?.timezone,
        // OAuth providers
        oauthProviders: user.oauthProviders
      }
    });

  } catch (error) {
    console.error('Get user info error:', error);
    return NextResponse.json({
      error: 'Failed to get user information'
    }, { status: 500 });
  }
}
