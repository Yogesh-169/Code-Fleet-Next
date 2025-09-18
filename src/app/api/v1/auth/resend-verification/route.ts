import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { sendEmail } from '@/lib/mailer';
import { rateLimit } from '@/lib/rate-limit';
import { generateEmailVerificationToken } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';

const schema = z.object({ 
  email: z.string().email().toLowerCase().trim() 
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const rl = rateLimit(`resend:${ip}`, 3, 60_000); // 3 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many verification requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { email } = schema.parse(body);

    const user = await UserModel.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    });

    // Don't leak user existence - always return success
    if (!user) {
      return NextResponse.json({ 
        message: 'If an account with this email exists, a verification email has been sent.' 
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json({ 
        message: 'Email is already verified' 
      });
    }

    // Check if recent verification email was sent (within 5 minutes)
    const recentVerification = user.emailVerificationExpires && 
      user.emailVerificationExpires.getTime() > Date.now() - (5 * 60 * 1000);
    
    if (recentVerification) {
      return NextResponse.json({ 
        message: 'Verification email already sent. Please check your email or wait before requesting another.',
        retryAfter: 300 // 5 minutes
      }, { status: 429 });
    }

    // Generate new verification token
    const verificationToken = generateEmailVerificationToken();
    const hashedToken = await hashToken(verificationToken);
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await UserModel.findByIdAndUpdate(user._id, {
      emailVerificationToken: hashedToken,
      emailVerificationExpires: expires,
      updatedAt: new Date()
    });

    // Send verification email with enhanced template
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/v1/auth/verify?token=${verificationToken}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email - CodFleet</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #e74c3c;">Verify Your Email Address</h1>
            <p>Hello ${user.firstName || 'there'},</p>
            <p>You requested a new verification email for your CodFleet account. Click the button below to verify your email address:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p>This verification link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't request this verification email, please ignore this message.</p>
            
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
      subject: 'Verify Your Email - CodFleet',
      html: emailHtml,
    });

    const devToken = process.env.NODE_ENV !== 'production' ? { 
      devEmailVerificationToken: verificationToken 
    } : {};

    return NextResponse.json({ 
      message: 'Verification email sent successfully',
      ...devToken
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid email address',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to send verification email. Please try again later.',
      code: 'EMAIL_SEND_ERROR'
    }, { status: 500 });
  }
}


