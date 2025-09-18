import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { signJwt, signRefreshToken, hashToken } from '@/lib/auth';
import { verifyGoogleToken } from '@/lib/google-oauth';
import { rateLimit } from '@/lib/rate-limit';

const googleLoginSchema = z.object({
  idToken: z.string().min(1),
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
    
    // Rate limiting for Google login
    const rl = rateLimit(`google-login:${ip}`, 10, 60_000); // 10 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many Google login attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { idToken, deviceInfo } = googleLoginSchema.parse(body);

    // Verify Google ID token
    const googleUser = await verifyGoogleToken(idToken);
    if (!googleUser) {
      return NextResponse.json({ 
        error: 'Invalid Google token' 
      }, { status: 401 });
    }

    // Check if email is verified by Google
    if (!googleUser.email_verified) {
      return NextResponse.json({ 
        error: 'Google email not verified. Please verify your email with Google first.',
        code: 'EMAIL_NOT_VERIFIED'
      }, { status: 403 });
    }

    await connectToDatabase();

    // Find user by Google provider ID or email
    let user = await UserModel.findOne({
      $or: [
        { 'oauthProviders.provider': 'google', 'oauthProviders.providerId': googleUser.id },
        { email: googleUser.email.toLowerCase() }
      ],
      isActive: true
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'No account found with this Google account. Please register first.',
        code: 'ACCOUNT_NOT_FOUND'
      }, { status: 404 });
    }

    // Check if account is suspended
    if (user.isSuspended) {
      return NextResponse.json({ 
        error: 'Account is suspended',
        reason: user.suspensionReason,
        suspendedUntil: user.suspensionUntil
      }, { status: 403 });
    }

    // Update or add Google OAuth provider info
    const existingProvider = user.oauthProviders.find(p => p.provider === 'google' && p.providerId === googleUser.id);
    
    if (existingProvider) {
      // Update last used time
      await UserModel.updateOne(
        { 
          _id: user._id, 
          'oauthProviders.provider': 'google', 
          'oauthProviders.providerId': googleUser.id 
        },
        { 
          $set: { 
            'oauthProviders.$.lastUsedAt': new Date(),
            'oauthProviders.$.name': googleUser.name,
            'oauthProviders.$.picture': googleUser.picture,
            'oauthProviders.$.locale': googleUser.locale
          }
        }
      );
    } else {
      // Add new Google provider
      await UserModel.findByIdAndUpdate(user._id, {
        $push: {
          oauthProviders: {
            provider: 'google',
            providerId: googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            locale: googleUser.locale,
            connectedAt: new Date(),
            lastUsedAt: new Date(),
            isActive: true
          }
        }
      });
    }

    // Update last login info
    await UserModel.findByIdAndUpdate(user._id, {
      lastLoginAt: new Date(),
      lastLoginIP: ip,
      failedLoginAttempts: 0, // Reset failed attempts on successful login
      lockoutUntil: null
    });

    // Generate tokens
    const accessToken = signJwt({ 
      sub: String(user._id), 
      roles: user.roles, 
      email: user.email,
      type: 'access',
      provider: 'google'
    });

    const refreshToken = signRefreshToken({ 
      sub: String(user._id), 
      type: 'refresh',
      provider: 'google'
    });

    // Store refresh token (hashed)
    const hashedRefreshToken = await hashToken(refreshToken);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        refreshTokens: {
          token: hashedRefreshToken,
          expiresAt: refreshTokenExpiry,
          deviceInfo: {
            userAgent: userAgent,
            ipAddress: ip,
            ...deviceInfo
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
        preferences: user.preferences,
        oauthProviders: user.oauthProviders.filter(p => p.isActive)
      },
      provider: 'google',
      meta: {
        responseTime: `${responseTime}ms`
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Google login failed. Please try again later.',
      code: 'GOOGLE_LOGIN_ERROR'
    }, { status: 500 });
  }
}
