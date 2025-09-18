# 🔐 CodFleet Login System

This document describes the complete login system with role-based access control and Google OAuth integration.

## 📋 Login System Overview

### **Features:**
- ✅ **Email/Password Login** - Traditional authentication
- ✅ **Google OAuth Login** - One-click Google authentication
- ✅ **Role-Based Access Control** - Users see functionality based on their role
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Reset** - Forgot password functionality
- ✅ **Remember Me** - Persistent login sessions
- ✅ **Auto Token Refresh** - Seamless session management

## 🎯 **Role-Based Access Control**

### **User Types and Default Roles:**
- **Company**: `company_org_admin` - Full company management access
- **Educational Institute**: `edu_institute_admin` - Institute management access  
- **Freelancer**: `freelancer` - Freelancer-specific functionality
- **Admin**: `admin` - System administration access

### **Role-Based Dashboard Access:**
- **Company Users** → Company Dashboard (project management, hiring)
- **Educational Institute Users** → Institute Dashboard (partnerships, student management)
- **Freelancer Users** → Freelancer Dashboard (project search, earnings)
- **Admin Users** → Admin Dashboard (system management)

## 🌐 **Login Pages Available**

### **1. Main Login Page**
**URL**: `http://localhost:3000/login.html`

**Features:**
- ✅ **Email/Password Login Form**
- ✅ **Google OAuth Integration**
- ✅ **Password Reset Functionality**
- ✅ **Remember Me Option**
- ✅ **Role-Based Dashboard Redirect**
- ✅ **Auto Token Refresh**
- ✅ **Responsive Design**

### **2. Debug JWT Tool**
**URL**: `http://localhost:3000/debug-jwt.html`

**Features:**
- ✅ **JWT Token Analysis**
- ✅ **Login Testing**
- ✅ **Token Decoding**
- ✅ **API Endpoint Testing**

## 🔧 **API Endpoints**

### **Authentication Endpoints:**
- `POST /api/v1/auth/login` - Email/password login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get user information
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### **Google OAuth Endpoints:**
- `GET /api/v1/auth/google/url` - Get Google OAuth URL
- `POST /api/v1/auth/google/login` - Login with Google
- `POST /api/v1/auth/google/register` - Register with Google
- `GET /api/v1/auth/google/callback` - OAuth callback
- `POST /api/v1/auth/google/disconnect` - Disconnect Google account

## 📱 **Dashboard Pages**

### **1. Company Dashboard**
**URL**: `http://localhost:3000/company-dashboard.html`

**Features:**
- ✅ **Project Management** - View and manage active projects
- ✅ **Freelancer Hiring** - Find and hire freelancers
- ✅ **Analytics** - Business metrics and insights
- ✅ **Company Information** - Display company details
- ✅ **Quick Actions** - Post projects, find freelancers

### **2. Freelancer Dashboard**
**URL**: `http://localhost:3000/freelancer-dashboard.html`

**Features:**
- ✅ **Project Search** - Browse available projects
- ✅ **Earnings Tracking** - View total earnings and payments
- ✅ **Profile Management** - Update freelancer profile
- ✅ **Rating Display** - Show freelancer rating
- ✅ **Quick Actions** - Apply to projects, view earnings

### **3. Educational Institute Dashboard**
**URL**: `http://localhost:3000/institute-dashboard.html`

**Features:**
- ✅ **Student Management** - Track enrolled students
- ✅ **Partnership Projects** - Manage collaboration projects
- ✅ **Program Management** - Add and manage programs
- ✅ **Analytics** - Student progress and partnership metrics
- ✅ **Quick Actions** - Add programs, manage partnerships

## 🔐 **Authentication Flow**

### **1. Login Process:**
1. User enters email/password or clicks Google login
2. API validates credentials
3. JWT access and refresh tokens are generated
4. Tokens are stored in localStorage
5. User is redirected to role-appropriate dashboard

### **2. Token Management:**
1. Access tokens expire in 15 minutes
2. Refresh tokens expire in 7 days
3. Auto-refresh happens before access token expires
4. Failed refresh redirects to login page

### **3. Role-Based Redirect:**
1. After login, user info is fetched from `/me` endpoint
2. User type and roles are determined
3. User is redirected to appropriate dashboard:
   - `company` → Company Dashboard
   - `educational_institute` → Institute Dashboard
   - `freelancer` → Freelancer Dashboard
   - `admin` → Admin Dashboard

## 🚀 **Getting Started**

### **1. Start the API Server**
```bash
cd codfleet-api
npm run dev
```

### **2. Access Login Pages**
- **Main Login**: http://localhost:3000/login.html
- **Debug Tool**: http://localhost:3000/debug-jwt.html

### **3. Test Login**
- Use registered user credentials
- Test Google OAuth (requires Google Cloud Console setup)
- Verify role-based dashboard access

## 📊 **User Information Structure**

### **User Object from `/me` Endpoint:**
```json
{
  "user": {
    "id": "68c5520d38335ff677190297",
    "email": "testfreelancer@example.com",
    "firstName": "Alex",
    "lastName": "Johnson",
    "roles": ["freelancer"],
    "userType": "freelancer",
    "isEmailVerified": true,
    "status": "active",
    "createdAt": "2025-09-13T11:14:21.292Z",
    "lastLoginAt": "2025-09-13T11:33:21.454Z",
    "freelancerInfo": {
      "fullName": "Alex Johnson",
      "countryOfCitizenship": "Finland",
      "taxRegistrationStatus": "registered",
      "vatStatus": "not_vat_registered"
    },
    "preferences": {
      "language": "en",
      "timezone": "UTC"
    }
  }
}
```

## 🔒 **Security Features**

### **JWT Security:**
- ✅ **Signed Tokens** - HMAC SHA-256 signing
- ✅ **Short Expiry** - 15-minute access token lifetime
- ✅ **Refresh Tokens** - Secure token renewal
- ✅ **Audience Validation** - Token audience verification
- ✅ **Issuer Validation** - Token issuer verification

### **Password Security:**
- ✅ **Strong Passwords** - Minimum 12 characters with complexity
- ✅ **Bcrypt Hashing** - Secure password storage
- ✅ **Password Reset** - Secure password recovery
- ✅ **Account Lockout** - Protection against brute force

### **Session Security:**
- ✅ **Secure Storage** - localStorage for token storage
- ✅ **Auto Logout** - Session timeout handling
- ✅ **Token Validation** - Every request validated
- ✅ **CORS Protection** - Cross-origin request security

## 🎯 **Role-Based Functionality**

### **Company Users (`company_org_admin`):**
- ✅ **Project Management** - Create, edit, manage projects
- ✅ **Freelancer Hiring** - Search, hire, manage freelancers
- ✅ **Payment Management** - Handle payments and invoices
- ✅ **Analytics** - Business metrics and reporting
- ✅ **Team Management** - Manage company team members

### **Educational Institute Users (`edu_institute_admin`):**
- ✅ **Student Management** - Track enrolled students
- ✅ **Partnership Management** - Manage CodFleet partnerships
- ✅ **Program Management** - Add and manage educational programs
- ✅ **Course Management** - Create and manage courses
- ✅ **Analytics** - Student progress and partnership metrics

### **Freelancer Users (`freelancer`):**
- ✅ **Project Search** - Browse and search available projects
- ✅ **Project Applications** - Apply to projects
- ✅ **Earnings Management** - Track payments and earnings
- ✅ **Profile Management** - Update freelancer profile
- ✅ **Portfolio Management** - Showcase work and skills

### **Admin Users (`admin`):**
- ✅ **User Management** - Manage all users
- ✅ **System Administration** - System-wide settings
- ✅ **Analytics** - Platform-wide metrics
- ✅ **Content Management** - Manage platform content
- ✅ **Support Management** - Handle support requests

## 🔧 **Configuration**

### **Environment Variables:**
```bash
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **Google OAuth Setup:**
1. Create Google Cloud Console project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized origins: `http://localhost:3000`
5. Add redirect URI: `http://localhost:3000/api/v1/auth/google/callback`

## 🧪 **Testing**

### **Test Login Flow:**
1. **Register User** - Use registration pages
2. **Verify Email** - Check email and verify account
3. **Login** - Use login page or API
4. **Check Dashboard** - Verify role-based access
5. **Test Logout** - Ensure proper session cleanup

### **Test Google OAuth:**
1. **Setup Google Console** - Configure OAuth credentials
2. **Test OAuth Flow** - Click Google login button
3. **Verify Redirect** - Check callback handling
4. **Check User Creation** - Verify user is created with correct role

## 🎉 **Conclusion**

The CodFleet login system provides:

- ✅ **Complete Authentication** - Email/password and Google OAuth
- ✅ **Role-Based Access** - Users see only their relevant functionality
- ✅ **Secure Token Management** - JWT with refresh tokens
- ✅ **Responsive UI** - Modern, mobile-friendly design
- ✅ **Dashboard Integration** - Role-appropriate dashboards
- ✅ **Security Features** - Comprehensive security measures

**Ready for production use! 🚀**

The system ensures that:
- **Company users** see company-specific functionality
- **Educational institute users** see institute-specific features
- **Freelancer users** see freelancer-specific tools
- **Admin users** see administrative controls

Each user type gets exactly the functionality they need based on their role, creating a personalized and efficient user experience.
