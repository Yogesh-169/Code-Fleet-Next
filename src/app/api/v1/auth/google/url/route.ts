import { NextResponse } from 'next/server';
import { getGoogleAuthUrl, validateGoogleConfig } from '@/lib/google-oauth';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting
    const rl = rateLimit(`google-url:${ip}`, 20, 60_000); // 20 requests per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many requests', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    // Validate Google OAuth configuration
    const configValidation = validateGoogleConfig();
    if (!configValidation.isValid) {
      return NextResponse.json({ 
        error: 'Google OAuth not configured',
        details: configValidation.errors
      }, { status: 500 });
    }

    // Generate Google OAuth URL
    const authUrl = getGoogleAuthUrl();

    return NextResponse.json({ 
      authUrl,
      provider: 'google',
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    });

  } catch (error) {
    console.error('Google OAuth URL generation error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to generate Google OAuth URL',
      code: 'GOOGLE_URL_ERROR'
    }, { status: 500 });
  }
}
