// JWT utilities specifically for middleware (Edge Runtime compatible)
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

// JWT verification for middleware (Edge Runtime compatible)
export function verifyJwtForMiddleware(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'codfleet-api',
      audience: 'codfleet-client'
    });
  } catch (error) {
    return null;
  }
}

// Check if token is an access token
export function isAccessToken(payload: any): boolean {
  return payload && payload.type === 'access';
}
