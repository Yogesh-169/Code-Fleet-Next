import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { signJwt, signRefreshToken, hashToken } from '@/lib/auth';
import { getGoogleTokens, getGoogleUserInfo } from '@/lib/google-oauth';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      return NextResponse.json({ 
        error: 'Google OAuth authorization failed',
        details: error
      }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({ 
        error: 'Authorization code is required' 
      }, { status: 400 });
    }

    // Rate limiting
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const rl = rateLimit(`google-callback:${ip}`, 10, 60_000);
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    // Exchange code for tokens
    const tokens = await getGoogleTokens(code);
    if (!tokens) {
      return NextResponse.json({ 
        error: 'Failed to exchange authorization code for tokens' 
      }, { status: 400 });
    }

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);
    if (!googleUser) {
      return NextResponse.json({ 
        error: 'Failed to get user information from Google' 
      }, { status: 400 });
    }

    await connectToDatabase();

    // Find existing user - only allow existing users to login
    let user = await UserModel.findOne({
      $or: [
        { 'oauthProviders.provider': 'google', 'oauthProviders.providerId': googleUser.id },
        { email: googleUser.email.toLowerCase() }
      ],
      isActive: true
    });

    // If user doesn't exist, redirect to registration page with error message
    if (!user) {
      const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const errorUrl = new URL('/login.html', frontendUrl);
      errorUrl.searchParams.set('error', 'user_not_registered');
      errorUrl.searchParams.set('message', 'Please register first before using Google login');
      errorUrl.searchParams.set('email', googleUser.email);
      
      return NextResponse.redirect(errorUrl.toString());
    }

    // User exists, proceed with login
    const isNewUser = false;
    
    // Update existing user's Google provider info
    const existingProvider = user.oauthProviders.find(p => p.provider === 'google' && p.providerId === googleUser.id);
    
    if (existingProvider) {
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
      // Add Google provider to existing user
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

    // Update last login
    await UserModel.findByIdAndUpdate(user._id, {
      lastLoginAt: new Date(),
      lastLoginIP: ip,
      failedLoginAttempts: 0,
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

    // Store refresh token
    const hashedRefreshToken = await hashToken(refreshToken);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        refreshTokens: {
          token: hashedRefreshToken,
          expiresAt: refreshTokenExpiry,
          deviceInfo: {
            userAgent: req.headers.get('user-agent') || 'unknown',
            ipAddress: ip
          }
        }
      }
    });

    // Redirect to frontend with tokens
    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = new URL('/auth/callback', frontendUrl);
    redirectUrl.searchParams.set('access_token', accessToken);
    redirectUrl.searchParams.set('refresh_token', refreshToken);
    redirectUrl.searchParams.set('provider', 'google');
    redirectUrl.searchParams.set('is_new_user', isNewUser.toString());

    return NextResponse.redirect(redirectUrl.toString());

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    
    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const errorUrl = new URL('/auth/error', frontendUrl);
    errorUrl.searchParams.set('error', 'oauth_callback_failed');
    errorUrl.searchParams.set('provider', 'google');
    
    return NextResponse.redirect(errorUrl.toString());
  }
}
