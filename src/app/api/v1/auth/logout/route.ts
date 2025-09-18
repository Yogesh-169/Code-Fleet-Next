import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { verifyJwt } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { rateLimit } from '@/lib/rate-limit';

const logoutSchema = z.object({
  refreshToken: z.string().optional(),
  logoutAll: z.boolean().optional().default(false)
});

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for logout requests
    const rl = rateLimit(`logout:${ip}`, 20, 60_000); // 20 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many logout requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const { refreshToken, logoutAll } = logoutSchema.parse(body);

    // Verify access token from Authorization header
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

    await connectToDatabase();

    if (logoutAll) {
      // Revoke all refresh tokens for the user
      await UserModel.findByIdAndUpdate(payload.sub, {
        $set: {
          'refreshTokens.$[].isRevoked': true
        }
      });
    } else if (refreshToken) {
      // Revoke specific refresh token
      const hashedRefreshToken = await hashToken(refreshToken);
      await UserModel.findByIdAndUpdate(payload.sub, {
        $set: {
          'refreshTokens.$[elem].isRevoked': true
        }
      }, {
        arrayFilters: [{ 'elem.token': hashedRefreshToken }]
      });
    }

    return NextResponse.json({ 
      message: 'Logged out successfully' 
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Logout failed. Please try again.',
      code: 'LOGOUT_ERROR'
    }, { status: 500 });
  }
}
