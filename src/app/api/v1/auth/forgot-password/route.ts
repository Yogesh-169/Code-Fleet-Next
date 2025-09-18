import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { sendEmail } from '@/lib/mailer';
import { rateLimit } from '@/lib/rate-limit';
import { generatePasswordResetToken } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';

const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase().trim()
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for password reset requests
    const rl = rateLimit(`forgot-password:${ip}`, 3, 60_000); // 3 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many password reset requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await UserModel.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });

    // Don't leak user existence - always return success
    if (!user) {
      return NextResponse.json({ 
        message: 'If an account with this email exists, a password reset email has been sent.' 
      });
    }

    // Check if recent password reset was requested (within 15 minutes)
    const recentReset = user.passwordResetExpires && 
      user.passwordResetExpires.getTime() > Date.now() - (15 * 60 * 1000);
    
    if (recentReset) {
      return NextResponse.json({ 
        message: 'Password reset email already sent. Please check your email or wait before requesting another.',
        retryAfter: 900 // 15 minutes
      }, { status: 429 });
    }

    // Generate password reset token
    const resetToken = generatePasswordResetToken();
    const hashedToken = await hashToken(resetToken);
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await UserModel.findByIdAndUpdate(user._id, {
      passwordResetToken: hashedToken,
      passwordResetExpires: expires,
      updatedAt: new Date()
    });

    // Send password reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password - CodFleet</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #e74c3c;">Reset Your Password</h1>
            <p>Hello ${user.firstName || 'there'},</p>
            <p>You requested to reset your password for your CodFleet account. Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p>This password reset link will expire in 1 hour for security reasons.</p>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              This email was sent to ${user.email}. If you have any questions, please contact our support team.
            </p>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password - CodFleet',
      html: emailHtml,
    });

    const devToken = process.env.NODE_ENV !== 'production' ? { 
      devPasswordResetToken: resetToken 
    } : {};

    return NextResponse.json({ 
      message: 'Password reset email sent successfully',
      ...devToken
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid email address',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to send password reset email. Please try again later.',
      code: 'EMAIL_SEND_ERROR'
    }, { status: 500 });
  }
}
