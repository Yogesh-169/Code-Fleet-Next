import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { hashPassword, validatePasswordStrength } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { rateLimit } from '@/lib/rate-limit';

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(12)
});

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for password reset
    const rl = rateLimit(`reset-password:${ip}`, 5, 60_000); // 5 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many password reset attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json({ 
        error: 'Password does not meet security requirements',
        details: passwordValidation.errors,
        suggestions: [
          'Use at least 12 characters',
          'Include uppercase and lowercase letters',
          'Add numbers and special characters',
          'Avoid common words or patterns'
        ]
      }, { status: 400 });
    }

    await connectToDatabase();

    // Hash the token to compare with stored hash
    const hashedToken = await hashToken(token);
    
    const user = await UserModel.findOne({ 
      passwordResetToken: hashedToken,
      isActive: true
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid or expired reset token' 
      }, { status: 400 });
    }

    // Check if token is expired
    if (!user.passwordResetExpires || user.passwordResetExpires.getTime() < Date.now()) {
      return NextResponse.json({ 
        error: 'Password reset token has expired. Please request a new password reset.',
        code: 'TOKEN_EXPIRED'
      }, { status: 400 });
    }

    // Hash new password
    const passwordHash = await hashPassword(password);

    // Update user with new password and clear reset token
    await UserModel.findByIdAndUpdate(user._id, {
      passwordHash,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
      lastPasswordChange: new Date(),
      failedLoginAttempts: 0, // Reset failed attempts
      lockoutUntil: null, // Clear any lockout
      updatedAt: new Date()
    });

    // Revoke all refresh tokens for security
    await UserModel.findByIdAndUpdate(user._id, {
      $set: {
        'refreshTokens.$[].isRevoked': true
      }
    });

    return NextResponse.json({ 
      message: 'Password reset successfully. Please login with your new password.' 
    });

  } catch (error) {
    console.error('Password reset error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Password reset failed. Please try again later.',
      code: 'RESET_ERROR'
    }, { status: 500 });
  }
}
