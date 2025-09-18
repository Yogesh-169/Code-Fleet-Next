# Google OAuth Integration for CodFleet API

## Overview
This document describes the Google OAuth integration implemented for CodFleet API, allowing users to register and login using their Google accounts.

## Features Implemented

### ✅ Google OAuth Endpoints
- **GET** `/api/v1/auth/google/url` - Get Google OAuth authorization URL
- **POST** `/api/v1/auth/google/login` - Login with Google ID token
- **POST** `/api/v1/auth/google/register` - Register with Google ID token
- **GET** `/api/v1/auth/google/callback` - OAuth callback handler
- **POST** `/api/v1/auth/google/disconnect` - Disconnect Google account

### ✅ Enhanced User Model
- OAuth providers array with Google support
- Provider-specific user data storage
- Multiple OAuth provider support (ready for Microsoft, Apple)
- OAuth provider management and tracking

### ✅ Security Features
- Google ID token verification
- Email verification through Google
- Rate limiting on all OAuth endpoints
- Secure token storage and management
- OAuth provider disconnection with safety checks

## Setup Instructions

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/v1/auth/google/callback` (development)
     - `https://yourdomain.com/api/v1/auth/google/callback` (production)

4. **Get Client ID and Secret**
   - Copy the Client ID and Client Secret
   - Add them to your environment variables

### 2. Environment Variables

Add these to your `.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Frontend Integration

#### Option 1: Direct ID Token (Recommended)
Use Google's JavaScript library to get ID tokens directly:

```html
<!-- Include Google Sign-In library -->
<script src="https://accounts.google.com/gsi/client" async defer></script>

<div id="g_id_onload"
     data-client_id="YOUR_GOOGLE_CLIENT_ID"
     data-callback="handleCredentialResponse">
</div>
<div class="g_id_signin" data-type="standard"></div>

<script>
function handleCredentialResponse(response) {
    // Send the ID token to your backend
    fetch('/api/v1/auth/google/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idToken: response.credential,
            deviceInfo: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                browser: 'Chrome' // Detect browser
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            // Store tokens and redirect
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            window.location.href = '/dashboard';
        }
    });
}
</script>
```

#### Option 2: OAuth Flow
Use the OAuth URL endpoint for server-side flow:

```javascript
// Get Google OAuth URL
fetch('/api/v1/auth/google/url')
    .then(response => response.json())
    .then(data => {
        // Redirect to Google OAuth
        window.location.href = data.authUrl;
    });
```

## API Endpoints Documentation

### 1. Get Google OAuth URL

**GET** `/api/v1/auth/google/url`

Get the Google OAuth authorization URL for server-side flow.

**Response:**
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?...",
  "provider": "google",
  "scopes": [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ]
}
```

### 2. Google Login

**POST** `/api/v1/auth/google/login`

Login with Google ID token.

**Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyNzQ4...",
  "deviceInfo": {
    "userAgent": "Mozilla/5.0...",
    "platform": "Windows",
    "browser": "Chrome"
  }
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["freelancer"],
    "isEmailVerified": true,
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "preferences": {...},
    "oauthProviders": [...]
  },
  "provider": "google",
  "meta": {
    "responseTime": "245ms"
  }
}
```

### 3. Google Registration

**POST** `/api/v1/auth/google/register`

Register a new account with Google ID token.

**Request Body:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzAyNzQ4...",
  "language": "en",
  "timezone": "UTC",
  "deviceInfo": {
    "userAgent": "Mozilla/5.0...",
    "platform": "Windows",
    "browser": "Chrome"
  }
}
```

**Response:**
```json
{
  "message": "Registration successful with Google account",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["freelancer"],
    "isEmailVerified": true,
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "preferences": {...},
    "oauthProviders": [...]
  },
  "provider": "google",
  "meta": {
    "responseTime": "312ms"
  }
}
```

### 4. Google OAuth Callback

**GET** `/api/v1/auth/google/callback?code=authorization_code&state=state`

Handle OAuth callback from Google (server-side flow).

**Response:** Redirects to frontend with tokens in URL parameters.

### 5. Disconnect Google Account

**POST** `/api/v1/auth/google/disconnect`

Disconnect Google OAuth account (requires authentication).

**Headers:**
```
Authorization: Bearer access_token
```

**Response:**
```json
{
  "message": "Google account disconnected successfully"
}
```

## Error Handling

### Common Error Responses

#### Invalid Google Token (401)
```json
{
  "error": "Invalid Google token"
}
```

#### Email Not Verified (403)
```json
{
  "error": "Google email not verified. Please verify your email with Google first.",
  "code": "EMAIL_NOT_VERIFIED"
}
```

#### Account Not Found (404)
```json
{
  "error": "No account found with this Google account. Please register first.",
  "code": "ACCOUNT_NOT_FOUND"
}
```

#### Account Already Exists (409)
```json
{
  "error": "Account already exists with this Google account. Please login instead.",
  "code": "ACCOUNT_EXISTS"
}
```

#### Cannot Disconnect Last Auth Method (400)
```json
{
  "error": "Cannot disconnect Google account. Please set a password or connect another OAuth provider first.",
  "code": "LAST_AUTH_METHOD"
}
```

## Security Features

### Token Verification
- Google ID tokens are verified using Google's official library
- Email verification status is checked
- Tokens are validated for audience and issuer

### Rate Limiting
- Login: 10 attempts per minute per IP
- Registration: 5 attempts per minute per IP
- URL generation: 20 attempts per minute per IP
- Disconnect: 5 attempts per minute per IP

### Account Safety
- Cannot disconnect Google if it's the only authentication method
- All refresh tokens are revoked when disconnecting
- OAuth provider info is updated on each login

## Database Schema

### OAuth Providers Array
```typescript
oauthProviders: [{
  provider: 'google' | 'microsoft' | 'apple',
  providerId: string, // Google user ID
  email: string, // Email from provider
  name: string, // Full name from provider
  picture: string, // Profile picture URL
  locale: string, // User's locale
  connectedAt: Date, // When connected
  lastUsedAt: Date, // Last login with this provider
  isActive: boolean // Whether provider is active
}]
```

## Testing

### Test Google Login
```bash
# 1. Get a valid Google ID token (use Google's test tools)
# 2. Test login
curl -X POST http://localhost:3000/api/v1/auth/google/login \
  -H "Content-Type: application/json" \
  -d '{
    "idToken": "your-google-id-token-here",
    "deviceInfo": {
      "userAgent": "Mozilla/5.0...",
      "platform": "Windows",
      "browser": "Chrome"
    }
  }'
```

### Test Google Registration
```bash
curl -X POST http://localhost:3000/api/v1/auth/google/register \
  -H "Content-Type: application/json" \
  -d '{
    "idToken": "your-google-id-token-here",
    "language": "en",
    "timezone": "UTC"
  }'
```

### Test OAuth URL
```bash
curl http://localhost:3000/api/v1/auth/google/url
```

## Production Considerations

### Security
- Use HTTPS in production
- Validate redirect URIs in Google Console
- Monitor OAuth usage and suspicious activity
- Implement proper CORS settings

### Performance
- Google API calls are cached where possible
- Database indexes are optimized for OAuth queries
- Rate limiting prevents abuse

### Monitoring
- Log OAuth login attempts
- Monitor failed token verifications
- Track OAuth provider connections/disconnections

## Next Steps

The Google OAuth integration is complete and ready for use. Future enhancements could include:

1. **Microsoft OAuth** - Similar implementation for Microsoft accounts
2. **Apple Sign-In** - Apple ID integration
3. **OAuth Provider Management** - UI for managing connected accounts
4. **Account Linking** - Link multiple OAuth providers to one account
5. **Advanced Security** - Device fingerprinting, suspicious activity detection

## Troubleshooting

### Common Issues

1. **"Google OAuth not configured"**
   - Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
   - Verify NEXT_PUBLIC_BASE_URL is configured

2. **"Invalid Google token"**
   - Ensure the ID token is valid and not expired
   - Check that the token is from the correct Google project

3. **"Email not verified"**
   - User needs to verify their email with Google first
   - Check Google account verification status

4. **Redirect URI mismatch**
   - Ensure the redirect URI in Google Console matches your callback URL
   - Check for trailing slashes and protocol (http vs https)

The Google OAuth integration is now complete and production-ready! 🚀
