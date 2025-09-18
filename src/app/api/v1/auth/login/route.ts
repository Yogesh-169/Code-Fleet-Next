import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { signJwt, signRefreshToken, verifyPassword, isAccountLocked, calculateLockoutDuration } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { rateLimit } from '@/lib/rate-limit';

const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
  deviceInfo: z.object({
    userAgent: z.string().optional(),
    platform: z.string().optional(),
    browser: z.string().optional()
  }).optional()
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Enhanced rate limiting
    const rl = rateLimit(`login:${ip}`, 5, 60_000); // 5 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many login attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const parsed = loginSchema.parse(body);

    await connectToDatabase();
    
    // Find user with all necessary fields
    const user = await UserModel.findOne({ 
      email: parsed.email.toLowerCase(),
      isActive: true 
    }).select('+passwordHash +failedLoginAttempts +lockoutUntil');

    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }

    // Check if account is locked
    if (isAccountLocked(user.lockoutUntil)) {
      const lockoutMinutes = Math.ceil((user.lockoutUntil!.getTime() - Date.now()) / (1000 * 60));
      return NextResponse.json({ 
        error: 'Account temporarily locked due to too many failed attempts',
        lockoutMinutes,
        retryAfter: lockoutMinutes * 60
      }, { status: 423 });
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return NextResponse.json({ 
        error: 'Account is suspended',
        reason: user.suspensionReason,
        suspendedUntil: user.suspensionUntil
      }, { status: 403 });
    }

    // Verify password
    const passwordValid = await verifyPassword(parsed.password, user.passwordHash);
    
    if (!passwordValid) {
      // Increment failed attempts
      const failedAttempts = (user.failedLoginAttempts || 0) + 1;
      const lockoutUntil = failedAttempts >= 5 ? calculateLockoutDuration(failedAttempts) : null;
      
      await UserModel.findByIdAndUpdate(user._id, {
        failedLoginAttempts: failedAttempts,
        lockoutUntil
      });

      return NextResponse.json({ 
        error: 'Invalid credentials',
        remainingAttempts: Math.max(0, 5 - failedAttempts)
      }, { status: 401 });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return NextResponse.json({ 
        error: 'Email not verified. Please check your email and verify your account.',
        code: 'EMAIL_NOT_VERIFIED'
      }, { status: 403 });
    }

    // Reset failed attempts on successful login
    await UserModel.findByIdAndUpdate(user._id, {
      failedLoginAttempts: 0,
      lockoutUntil: null,
      lastLoginAt: new Date(),
      lastLoginIP: ip
    });

    // Generate tokens
    const accessToken = signJwt({ 
      sub: String(user._id), 
      roles: user.roles, 
      email: user.email,
      type: 'access'
    });

    const refreshToken = signRefreshToken({ 
      sub: String(user._id), 
      type: 'refresh'
    });

    // Store refresh token (hashed)
    const hashedRefreshToken = await hashToken(refreshToken);
    const refreshTokenExpiry = new Date(Date.now() + (parsed.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)); // 30 days or 7 days

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        refreshTokens: {
          token: hashedRefreshToken,
          expiresAt: refreshTokenExpiry,
          deviceInfo: {
            userAgent: userAgent,
            ipAddress: ip,
            ...parsed.deviceInfo
          }
        }
      }
    });

    // Clean up old refresh tokens (keep only last 5)
    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        refreshTokens: {
          $each: [],
          $slice: -5
        }
      }
    });

    const responseTime = Date.now() - startTime;

    return NextResponse.json({ 
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 15 * 60, // 15 minutes
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        isEmailVerified: user.isEmailVerified,
        lastLoginAt: new Date(),
        preferences: user.preferences
      },
      meta: {
        responseTime: `${responseTime}ms`
      }
    });

  } catch (err: any) {
    console.error('Login error:', err);
    
    if (err?.issues) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: err.issues,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Login failed. Please try again later.',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}


