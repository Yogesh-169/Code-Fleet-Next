// Crypto utilities that work in both Node.js and Edge Runtime
// For Edge Runtime compatibility, we'll use Web Crypto API when available

// Check if we're in Edge Runtime
const isEdgeRuntime = typeof EdgeRuntime !== 'undefined';

// Generate secure random tokens using Web Crypto API (Edge compatible)
export function generateSecureToken(): string {
  if (isEdgeRuntime || typeof window !== 'undefined') {
    // Use Web Crypto API for Edge Runtime and browser
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } else {
    // Use Node.js crypto for server-side
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
  }
}

// Generate password reset token
export function generatePasswordResetToken(): string {
  return generateSecureToken();
}

// Generate email verification token
export function generateEmailVerificationToken(): string {
  return generateSecureToken();
}

// Hash tokens for storage (one-way) using Web Crypto API
export async function hashToken(token: string): Promise<string> {
  if (isEdgeRuntime || typeof window !== 'undefined') {
    // Use Web Crypto API for Edge Runtime and browser
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Use Node.js crypto for server-side
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

// Synchronous version for compatibility with existing code
export function hashTokenSync(token: string): string {
  if (isEdgeRuntime || typeof window !== 'undefined') {
    // For Edge Runtime, we need to use async version
    // This is a fallback that should not be used in Edge Runtime
    throw new Error('hashTokenSync cannot be used in Edge Runtime. Use hashToken instead.');
  } else {
    // Use Node.js crypto for server-side
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
