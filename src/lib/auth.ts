import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateSecureToken, generatePasswordResetToken, generateEmailVerificationToken, hashTokenSync } from './crypto-utils';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'; // Short-lived access tokens
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
const PASSWORD_RESET_EXPIRES_IN = process.env.PASSWORD_RESET_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

// Password hashing with stronger salt rounds
export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// JWT token generation
export function signJwt(payload: object): string {
  return jwt.sign(payload as any, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'codfleet-api',
    audience: 'codfleet-client'
  });
}

// Refresh token generation
export function signRefreshToken(payload: object): string {
  return jwt.sign(payload as any, JWT_SECRET, { 
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: 'codfleet-api',
    audience: 'codfleet-client'
  });
}

// JWT verification
export function verifyJwt(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'codfleet-api',
      audience: 'codfleet-client'
    });
  } catch (error) {
    return null;
  }
}

// Re-export crypto utilities for convenience
export { generateSecureToken, generatePasswordResetToken, generateEmailVerificationToken };

// Hash tokens for storage (one-way) - synchronous version
export function hashToken(token: string): string {
  return hashTokenSync(token);
}

// Verify password strength
export function validatePasswordStrength(password: string): { 
  isValid: boolean; 
  errors: string[] 
} {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common passwords
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ];
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password contains common patterns and is not secure');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Rate limiting for authentication attempts
export function isAccountLocked(lockoutUntil: Date | null): boolean {
  if (!lockoutUntil) return false;
  return new Date() < lockoutUntil;
}

// Calculate lockout duration (exponential backoff)
export function calculateLockoutDuration(failedAttempts: number): Date {
  const baseMinutes = 5;
  const maxMinutes = 60;
  const lockoutMinutes = Math.min(baseMinutes * Math.pow(2, failedAttempts - 1), maxMinutes);
  return new Date(Date.now() + lockoutMinutes * 60 * 1000);
}


