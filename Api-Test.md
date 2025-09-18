🔐 1. User Registration
POST /api/v1/auth/register
Method: POST
URL: http://localhost:3000/api/v1/auth/register

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "language": "en",
  "timezone": "UTC"
}



🔑 2. User Login
POST /api/v1/auth/login
Method: POST
URL: http://localhost:3000/api/v1/auth/login


{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "rememberMe": false,
  "deviceInfo": {
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "platform": "Windows",
    "browser": "Chrome"
  }
}



✅ 3. Email Verification
GET /api/v1/auth/verify
Method: GET
URL: http://localhost:3000/api/v1/auth/verify?token=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz


{
  "message": "Email verified successfully",
  "verified": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isEmailVerified": true
  }
}


�� 4. Resend Verification Email
POST /api/v1/auth/resend-verification
Method: POST
URL: http://localhost:3000/api/v1/auth/resend-verification


🚪 6. Logout
POST /api/v1/auth/logout
Method: POST
URL: http://localhost:3000/api/v1/auth/logout


{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "logoutAll": false
}
