import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { signJwt, verifyJwt } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { rateLimit } from '@/lib/rate-limit';

const refreshSchema = z.object({
  refreshToken: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for refresh requests
    const rl = rateLimit(`refresh:${ip}`, 10, 60_000); // 10 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many refresh requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { refreshToken } = refreshSchema.parse(body);

    // Verify refresh token
    const payload = verifyJwt(refreshToken);
    if (!payload || payload.type !== 'refresh') {
      return NextResponse.json({ 
        error: 'Invalid refresh token' 
      }, { status: 401 });
    }

    await connectToDatabase();

    // Find user and check refresh token
    const hashedRefreshToken = await hashToken(refreshToken);
    const user = await UserModel.findOne({
      _id: payload.sub,
      isActive: true,
      'refreshTokens.token': hashedRefreshToken,
      'refreshTokens.isRevoked': false,
      'refreshTokens.expiresAt': { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid or expired refresh token' 
      }, { status: 401 });
    }

    // Generate new access token
    const newAccessToken = signJwt({ 
      sub: String(user._id), 
      roles: user.roles, 
      email: user.email,
      type: 'access'
    });

    return NextResponse.json({ 
      accessToken: newAccessToken,
      tokenType: 'Bearer',
      expiresIn: 15 * 60, // 15 minutes
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Token refresh failed. Please login again.',
      code: 'REFRESH_ERROR'
    }, { status: 500 });
  }
}
