# CodFleet Authentication System

## Overview
This document describes the production-ready authentication system implemented for CodFleet API. The system provides secure user registration, login, password management, and token-based authentication.

## Features Implemented

### ✅ Core Authentication
- **User Registration** - Secure user registration with email verification
- **User Login** - JWT-based authentication with refresh tokens
- **Email Verification** - Email verification system with secure tokens
- **Password Management** - Password reset, change, and strength validation
- **Token Management** - Access tokens (15min) and refresh tokens (7-30 days)
- **Account Security** - Account lockout, failed attempt tracking, session management

### ✅ Security Features
- **Password Security** - Strong password requirements, hashing with bcrypt
- **Token Security** - JWT tokens with issuer/audience validation
- **Rate Limiting** - IP-based rate limiting for all auth endpoints
- **Account Lockout** - Exponential backoff for failed login attempts
- **Session Management** - Refresh token rotation and revocation
- **Input Validation** - Comprehensive input validation and sanitization

### ✅ Production Features
- **Error Handling** - Comprehensive error handling with proper HTTP status codes
- **Logging** - Request/response logging and error tracking
- **Health Checks** - Database health monitoring
- **Performance** - Response time tracking and optimization
- **Scalability** - Database indexes and connection pooling

## API Endpoints

### Authentication Endpoints

#### POST `/api/v1/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "language": "en",
  "timezone": "UTC"
}
```

**Response:**
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["freelancer"],
    "isEmailVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/v1/auth/login`
Authenticate user and return access/refresh tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": false,
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
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["freelancer"],
    "isEmailVerified": true,
    "lastLoginAt": "2024-01-01T00:00:00.000Z",
    "preferences": {...}
  }
}
```

#### GET `/api/v1/auth/verify?token=verification_token`
Verify user email address.

**Response:**
```json
{
  "message": "Email verified successfully",
  "verified": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isEmailVerified": true
  }
}
```

#### POST `/api/v1/auth/resend-verification`
Resend email verification.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST `/api/v1/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/v1/auth/logout`
Logout user and revoke tokens.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "logoutAll": false
}
```

#### POST `/api/v1/auth/forgot-password`
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST `/api/v1/auth/reset-password`
Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset_token",
  "password": "NewSecurePassword123!"
}
```

#### POST `/api/v1/auth/change-password`
Change password for authenticated user.

**Headers:**
```
Authorization: Bearer access_token
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewSecurePassword123!"
}
```

## Security Features

### Password Requirements
- Minimum 12 characters
- Must contain uppercase and lowercase letters
- Must contain numbers and special characters
- Cannot contain common password patterns
- Cannot be the same as current password (for changes)

### Rate Limiting
- Registration: 3 attempts per minute per IP
- Login: 5 attempts per minute per IP
- Password reset: 3 attempts per minute per IP
- Other endpoints: 10-20 attempts per minute per IP

### Account Lockout
- 5 failed login attempts triggers lockout
- Exponential backoff: 5min, 10min, 20min, 40min, 60min max
- Lockout resets on successful login

### Token Security
- Access tokens: 15 minutes expiration
- Refresh tokens: 7-30 days expiration (based on rememberMe)
- Tokens include issuer and audience validation
- Refresh tokens are hashed before storage
- Automatic token rotation on refresh

## Database Schema

### User Model
```typescript
{
  email: string (unique, indexed)
  passwordHash: string
  firstName: string
  lastName: string
  phone: string
  roles: UserRole[]
  isEmailVerified: boolean
  emailVerificationToken: string (hashed)
  emailVerificationExpires: Date
  passwordResetToken: string (hashed)
  passwordResetExpires: Date
  failedLoginAttempts: number
  lockoutUntil: Date
  lastLoginAt: Date
  lastLoginIP: string
  refreshTokens: RefreshToken[]
  twoFactorEnabled: boolean
  isActive: boolean
  isSuspended: boolean
  compliance: ComplianceData
  preferences: UserPreferences
  // ... other fields
}
```

## Environment Variables

Required environment variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/codfleet

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key-here-minimum-32-characters
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional details",
  "retryAfter": 60
}
```

Common error codes:
- `VALIDATION_ERROR` - Input validation failed
- `INVALID_CREDENTIALS` - Login credentials invalid
- `EMAIL_NOT_VERIFIED` - Email not verified
- `TOKEN_EXPIRED` - Token has expired
- `ACCOUNT_LOCKED` - Account temporarily locked
- `RATE_LIMIT_EXCEEDED` - Too many requests

## Production Considerations

### Security
- Use strong JWT secrets (32+ characters)
- Enable HTTPS in production
- Use secure SMTP configuration
- Implement proper CORS settings
- Regular security audits

### Performance
- Database indexes are configured
- Connection pooling enabled
- Response time monitoring
- Rate limiting implemented

### Monitoring
- Health check endpoint: `/api/health`
- Request/response logging
- Error tracking
- Database health monitoring

### Scalability
- Stateless JWT tokens
- Database connection pooling
- Rate limiting per IP
- Efficient database queries

## Testing

To test the authentication system:

1. Start the development server:
```bash
npm run dev
```

2. Test registration:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePassword123!","firstName":"Test","lastName":"User"}'
```

3. Check health:
```bash
curl http://localhost:3000/api/health
```

## Next Steps

The authentication system is now production-ready. Future enhancements could include:

1. **Two-Factor Authentication (2FA)** - TOTP/SMS verification
2. **Social Login** - Google/Microsoft OAuth integration
3. **Advanced Security** - Device fingerprinting, suspicious activity detection
4. **Audit Logging** - Comprehensive audit trail
5. **Compliance Features** - GDPR compliance, data export/deletion
6. **Advanced Rate Limiting** - User-based rate limiting, Redis integration
