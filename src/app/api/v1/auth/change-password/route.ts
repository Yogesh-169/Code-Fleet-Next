import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { verifyJwt, verifyPassword, hashPassword, validatePasswordStrength } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(12)
});

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for password change
    const rl = rateLimit(`change-password:${ip}`, 5, 60_000); // 5 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many password change attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    // Verify access token
    const authHeader = req.headers.get('authorization');
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    if (!accessToken) {
      return NextResponse.json({ 
        error: 'Access token required' 
      }, { status: 401 });
    }

    const payload = verifyJwt(accessToken);
    if (!payload || payload.type !== 'access') {
      return NextResponse.json({ 
        error: 'Invalid access token' 
      }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return NextResponse.json({ 
        error: 'New password does not meet security requirements',
        details: passwordValidation.errors,
        suggestions: [
          'Use at least 12 characters',
          'Include uppercase and lowercase letters',
          'Add numbers and special characters',
          'Avoid common words or patterns'
        ]
      }, { status: 400 });
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      return NextResponse.json({ 
        error: 'New password must be different from current password' 
      }, { status: 400 });
    }

    await connectToDatabase();

    // Find user with password hash
    const user = await UserModel.findById(payload.sub).select('+passwordHash');
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Verify current password
    const currentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!currentPasswordValid) {
      return NextResponse.json({ 
        error: 'Current password is incorrect' 
      }, { status: 400 });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update user with new password
    await UserModel.findByIdAndUpdate(user._id, {
      passwordHash: newPasswordHash,
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
      message: 'Password changed successfully. Please login again with your new password.' 
    });

  } catch (error) {
    console.error('Change password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Password change failed. Please try again later.',
      code: 'CHANGE_PASSWORD_ERROR'
    }, { status: 500 });
  }
}
