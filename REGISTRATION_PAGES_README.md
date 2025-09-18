# 🚀 CodFleet Registration Pages

This document describes the production-ready registration pages created for CodFleet, designed for real users to register and upload documents.

## 📋 Registration Pages Overview

### 1. **Main Registration Page** (`/register.html`)
A comprehensive multi-step registration form with user type selection and document upload.

### 2. **Company Registration Page** (`/register-company.html`)
A dedicated company registration form with document upload functionality.

## 🎯 Page Features

### **Main Registration Page** (`/register.html`)

#### **Features:**
- ✅ **User Type Selection** - Choose between Company, Educational Institute, or Freelancer
- ✅ **Multi-Step Form** - 3-step process: Basic Info → Details → Documents
- ✅ **Progress Indicator** - Visual progress tracking
- ✅ **Real Document Upload** - Drag & drop file upload with validation
- ✅ **Form Validation** - Client-side and server-side validation
- ✅ **Responsive Design** - Works on all devices
- ✅ **Success Modal** - Confirmation after successful registration

#### **User Flow:**
1. **Step 1**: Select user type (Company/Educational Institute/Freelancer)
2. **Step 2**: Fill in basic information (email, password, phone, language)
3. **Step 3**: Complete type-specific details and upload required documents
4. **Step 4**: Review and submit registration

### **Company Registration Page** (`/register-company.html`)

#### **Features:**
- ✅ **Single-Page Form** - All fields on one page
- ✅ **Company-Specific Fields** - Business registration, VAT, industry, etc.
- ✅ **Document Upload** - Required business documents
- ✅ **Terms & Conditions** - Compliance checkboxes
- ✅ **Real-time Validation** - Form validation as user types

## 🌐 Access URLs

### **Local Development:**
- **Main Registration**: http://localhost:3000/register.html
- **Company Registration**: http://localhost:3000/register-company.html

### **Production:**
- **Main Registration**: https://your-domain.com/register.html
- **Company Registration**: https://your-domain.com/register-company.html

## 📝 Form Fields by User Type

### **Company Registration Fields:**

#### **Basic Information:**
- Email Address *
- Password *
- Phone Number *
- Language Preference

#### **Company Details:**
- Legal Business Name *
- Registration Number *
- VAT Number *
- Industry *
- Employee Count
- Primary Contact Person *
- Headquarters Address *
- IBAN *

#### **Required Documents:**
- Business registration certificate
- VAT registration certificate
- Bank account verification
- Identity document of authorized person

#### **Terms & Conditions:**
- Information accuracy confirmation *
- Terms and conditions agreement *
- Responsibilities understanding *

### **Educational Institute Registration Fields:**

#### **Basic Information:**
- Email Address *
- Password *
- Phone Number *
- Language Preference

#### **Institute Details:**
- Institute Name *
- Accreditation Number *
- Institute Type *
- Website URL *
- Primary Contact Person *
- Programs Offered *
- Course Links
- Headquarters Address *

#### **Required Documents:**
- Accreditation certificate
- Insurance documentation
- Partnership agreement (if applicable)
- Authorized representative ID

#### **Terms & Conditions:**
- Partnership agreement *

### **Freelancer Registration Fields:**

#### **Basic Information:**
- Email Address *
- Password *
- Phone Number *
- Language Preference

#### **Personal Details:**
- Full Name *
- Date of Birth *
- Country of Citizenship *
- Finnish Identity Code *
- Primary Address *
- Tax Registration Status *
- VAT Status
- IBAN *

#### **Required Documents:**
- Passport or national ID
- Finnish identity code verification
- Tax registration certificate
- Bank account verification

#### **Terms & Conditions:**
- Information accuracy confirmation *
- Terms and conditions agreement *
- False information consequences understanding *

## 🔧 Technical Features

### **Form Validation:**
- **Client-side**: Real-time validation with visual feedback
- **Server-side**: Comprehensive validation using Zod schemas
- **Password Strength**: Minimum 12 characters with complexity requirements
- **Email Format**: Proper email validation
- **Required Fields**: All mandatory fields marked with *

### **Document Upload:**
- **File Types**: PDF, JPG, PNG, DOC, DOCX
- **File Size**: Maximum 10MB per file
- **Multiple Files**: Support for multiple document uploads
- **Drag & Drop**: Intuitive file selection interface
- **Progress Tracking**: Visual upload progress
- **File Validation**: Client-side file type and size validation

### **User Experience:**
- **Responsive Design**: Mobile-first approach
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Clear error messages and recovery
- **Success Feedback**: Confirmation modals and success states
- **Accessibility**: Proper labels, focus management, keyboard navigation

## 🚀 Getting Started

### **1. Start the API Server**
```bash
cd codfleet-api
npm run dev
```

### **2. Open Registration Pages**
- Main Registration: http://localhost:3000/register.html
- Company Registration: http://localhost:3000/register-company.html

### **3. Test Registration**
- Fill out the forms with real data
- Upload required documents
- Submit registration
- Check email for verification

## 📊 API Integration

### **Registration Endpoints:**
- **Company**: `POST /api/v1/auth/register/company-with-docs`
- **Educational Institute**: `POST /api/v1/auth/register/educational-institute`
- **Freelancer**: `POST /api/v1/auth/register/freelancer`

### **Document Upload:**
- **Endpoint**: `POST /api/v1/documents/upload`
- **Content-Type**: `multipart/form-data`
- **Files**: Multiple document files
- **Response**: Document metadata and status

### **Form Data Structure:**
```javascript
{
  userType: 'company' | 'educational_institute' | 'freelancer',
  email: 'user@example.com',
  password: 'SecurePassword123!',
  phone: '+358123456789',
  language: 'en' | 'fi' | 'sv',
  timezone: 'Europe/Helsinki',
  // Type-specific fields...
  documents: [File, File, ...]
}
```

## 🔒 Security Features

### **Client-Side Security:**
- **Input Sanitization**: XSS prevention
- **File Validation**: Type and size checking
- **Password Strength**: Complexity requirements
- **CSRF Protection**: Form token validation

### **Server-Side Security:**
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Zod schema validation
- **File Security**: Secure file handling
- **Authentication**: JWT token generation
- **Email Verification**: Required for account activation

## 📱 Responsive Design

### **Breakpoints:**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Mobile Features:**
- Touch-friendly form controls
- Optimized file upload interface
- Responsive grid layouts
- Mobile navigation

## 🎨 UI/UX Features

### **Design System:**
- **Colors**: Blue primary, green success, red error
- **Typography**: Clear hierarchy and readability
- **Spacing**: Consistent padding and margins
- **Icons**: Font Awesome icons throughout
- **Animations**: Smooth transitions and hover effects

### **User Experience:**
- **Progress Indicators**: Visual step tracking
- **Form Validation**: Real-time feedback
- **Error Messages**: Clear and helpful
- **Success States**: Confirmation and next steps
- **Loading States**: Visual feedback during processing

## 🔍 Testing Scenarios

### **Registration Flow Testing:**
1. **User Type Selection**: Test all three user types
2. **Form Validation**: Test required fields and validation rules
3. **Document Upload**: Test file upload with various file types
4. **Error Handling**: Test error scenarios and recovery
5. **Success Flow**: Test complete registration process

### **Document Upload Testing:**
1. **File Types**: Test PDF, JPG, PNG, DOC, DOCX
2. **File Sizes**: Test files under and over 10MB limit
3. **Multiple Files**: Test uploading multiple documents
4. **Drag & Drop**: Test drag and drop functionality
5. **Error Handling**: Test invalid file types and sizes

## 📈 Performance Optimization

### **Client-Side:**
- **Lazy Loading**: Alpine.js for minimal JavaScript
- **CDN Resources**: External libraries from CDN
- **Optimized Images**: Compressed and optimized
- **Minimal CSS**: Tailwind CSS for efficient styling

### **Server-Side:**
- **File Upload**: Efficient multipart handling
- **Database**: Optimized queries and indexing
- **Caching**: Response caching where appropriate
- **Compression**: Gzip compression for responses

## 🚀 Deployment

### **Static Files:**
- Place HTML files in `/public` directory
- Serve via Next.js static file serving
- Configure CDN for production

### **Environment Variables:**
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/codfleet
JWT_SECRET=your-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🎉 Conclusion

The CodFleet registration pages provide:

- ✅ **Production-Ready Forms** for all user types
- ✅ **Real Document Upload** functionality
- ✅ **Comprehensive Validation** and error handling
- ✅ **Modern, Responsive UI** with excellent UX
- ✅ **Security Features** for safe data handling
- ✅ **API Integration** with backend services

**Ready for real users to register and join CodFleet! 🚀**
