import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { verifyJwt } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting
    const rl = rateLimit(`google-disconnect:${ip}`, 5, 60_000); // 5 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many requests', 
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

    await connectToDatabase();

    // Find user
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Check if user has Google OAuth connected
    const googleProvider = user.oauthProviders.find(p => p.provider === 'google' && p.isActive);
    if (!googleProvider) {
      return NextResponse.json({ 
        error: 'Google account not connected' 
      }, { status: 400 });
    }

    // Check if user has other authentication methods
    const hasPassword = user.passwordHash && user.passwordHash.length > 0;
    const hasOtherOAuth = user.oauthProviders.some(p => p.provider !== 'google' && p.isActive);

    if (!hasPassword && !hasOtherOAuth) {
      return NextResponse.json({ 
        error: 'Cannot disconnect Google account. Please set a password or connect another OAuth provider first.',
        code: 'LAST_AUTH_METHOD'
      }, { status: 400 });
    }

    // Disconnect Google OAuth
    await UserModel.updateOne(
      { 
        _id: user._id, 
        'oauthProviders.provider': 'google', 
        'oauthProviders.providerId': googleProvider.providerId 
      },
      { 
        $set: { 
          'oauthProviders.$.isActive': false,
          'oauthProviders.$.disconnectedAt': new Date()
        }
      }
    );

    // Revoke all refresh tokens for security
    await UserModel.findByIdAndUpdate(user._id, {
      $set: {
        'refreshTokens.$[].isRevoked': true
      }
    });

    return NextResponse.json({ 
      message: 'Google account disconnected successfully' 
    });

  } catch (error) {
    console.error('Google disconnect error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to disconnect Google account. Please try again later.',
      code: 'GOOGLE_DISCONNECT_ERROR'
    }, { status: 500 });
  }
}
