import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

if (!GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}

if (!GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

// Create OAuth2 client
export const googleClient = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/auth/google/callback`
);

// Interface for Google user data
export interface GoogleUserData {
  id: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// Verify Google ID token
export async function verifyGoogleToken(idToken: string): Promise<GoogleUserData | null> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email!,
      email_verified: payload.email_verified || false,
      name: payload.name || '',
      given_name: payload.given_name || '',
      family_name: payload.family_name || '',
      picture: payload.picture || '',
      locale: payload.locale || 'en',
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    return null;
  }
}

// Generate Google OAuth URL
export function getGoogleAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  return googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });
}

// Exchange authorization code for tokens
export async function getGoogleTokens(code: string): Promise<{
  access_token: string;
  refresh_token?: string;
  id_token: string;
} | null> {
  try {
    const { tokens } = await googleClient.getToken(code);
    return tokens as any;
  } catch (error) {
    console.error('Failed to exchange code for tokens:', error);
    return null;
  }
}

// Get user info from Google using access token
export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserData | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info from Google');
    }

    const data = await response.json();
    
    return {
      id: data.id,
      email: data.email,
      email_verified: data.verified_email || false,
      name: data.name || '',
      given_name: data.given_name || '',
      family_name: data.family_name || '',
      picture: data.picture || '',
      locale: data.locale || 'en',
    };
  } catch (error) {
    console.error('Failed to get user info from Google:', error);
    return null;
  }
}

// Validate Google OAuth configuration
export function validateGoogleConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!GOOGLE_CLIENT_ID) {
    errors.push('GOOGLE_CLIENT_ID is not set');
  }

  if (!GOOGLE_CLIENT_SECRET) {
    errors.push('GOOGLE_CLIENT_SECRET is not set');
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    errors.push('NEXT_PUBLIC_BASE_URL is not set');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
