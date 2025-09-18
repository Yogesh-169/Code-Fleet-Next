import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwtForMiddleware, isAccessToken } from '@/lib/jwt-middleware';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/api/health',
    '/api/v1/auth/register',
    '/api/v1/auth/register/company',
    '/api/v1/auth/register/educational-institute',
    '/api/v1/auth/register/freelancer',
    '/api/v1/auth/login',
    '/api/v1/auth/verify',
    '/api/v1/auth/resend-verification',
    '/api/v1/auth/forgot-password',
    '/api/v1/auth/reset-password',
    '/api/v1/auth/refresh',
    '/api/v1/auth/google/login',
    '/api/v1/auth/google/register',
    '/api/v1/auth/google/callback',
    '/api/v1/auth/google/url'
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Extract token from Authorization header
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  
  if (!token) {
    return NextResponse.json({ 
      error: 'Authorization token required',
      code: 'MISSING_TOKEN'
    }, { status: 401 });
  }

  // Verify JWT token
  const payload = verifyJwtForMiddleware(token);
  if (!payload) {
    return NextResponse.json({ 
      error: 'Invalid or expired token',
      code: 'INVALID_TOKEN'
    }, { status: 401 });
  }

  // Check if token is an access token
  if (!isAccessToken(payload)) {
    return NextResponse.json({ 
      error: 'Invalid token type',
      code: 'INVALID_TOKEN_TYPE'
    }, { status: 401 });
  }

  // Add user info to request headers for use in API routes
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-id', payload.sub);
  requestHeaders.set('x-user-email', payload.email);
  requestHeaders.set('x-user-roles', JSON.stringify(payload.roles));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/api/v1/companies/:path*',
    '/api/v1/tasks/:path*',
    '/api/v1/users/:path*',
    '/api/v1/admin/:path*',
    '/api/v1/auth/me',
    '/api/v1/auth/change-password',
    '/api/v1/auth/logout',
    '/api/v1/auth/google/disconnect'
  ],
};


