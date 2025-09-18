import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { hashToken } from '@/lib/crypto-utils';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ 
        error: 'Verification token is required' 
      }, { status: 400 });
    }

    // Hash the token to compare with stored hash
    const hashedToken = await hashToken(token);
    
    const user = await UserModel.findOne({ 
      emailVerificationToken: hashedToken,
      isActive: true
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid verification token' 
      }, { status: 400 });
    }

    // Check if token is expired
    if (!user.emailVerificationExpires || user.emailVerificationExpires.getTime() < Date.now()) {
      return NextResponse.json({ 
        error: 'Verification token has expired. Please request a new verification email.',
        code: 'TOKEN_EXPIRED'
      }, { status: 400 });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json({ 
        message: 'Email is already verified',
        verified: true
      });
    }

    // Verify the email
    await UserModel.findByIdAndUpdate(user._id, {
      isEmailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
      updatedAt: new Date()
    });

    return NextResponse.json({ 
      message: 'Email verified successfully',
      verified: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: true
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ 
      error: 'Email verification failed. Please try again later.',
      code: 'VERIFICATION_ERROR'
    }, { status: 500 });
  }
}


