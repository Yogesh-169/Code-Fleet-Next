# 🚀 CodFleet API Demo Pages

This document describes the demo pages created for testing the CodFleet registration APIs and document upload functionality.

## 📋 Demo Pages Overview

### 1. **Full Registration Demo** (`/demo-registration.html`)
A comprehensive demo page with complete forms for all user types and document upload functionality.

### 2. **Quick API Tester** (`/api-tester.html`)
A simple testing tool for quick API endpoint validation.

## 🎯 Demo Page Features

### **Full Registration Demo** (`/demo-registration.html`)

#### **Features:**
- ✅ **Real-time API Status Monitoring**
- ✅ **Complete Registration Forms** for all 3 user types
- ✅ **Document Upload Interface**
- ✅ **Live API Response Logging**
- ✅ **Form Validation & Error Handling**
- ✅ **Modern, Responsive UI**

#### **User Types Supported:**
1. **Company Registration**
   - Legal business information
   - Contact details
   - Billing information
   - Compliance declarations

2. **Educational Institute Registration**
   - Institute information
   - Accreditation details
   - Programs and courses
   - Partnership agreements

3. **Freelancer Registration**
   - Personal information
   - Identity verification
   - Tax and business details
   - Compliance declarations

#### **Document Upload Features:**
- Multiple file selection
- File type validation
- File size monitoring
- Upload progress tracking
- Document status display

### **Quick API Tester** (`/api-tester.html`)

#### **Features:**
- ✅ **One-Click API Testing**
- ✅ **Health Check Monitoring**
- ✅ **Test Result History**
- ✅ **Response Time Tracking**
- ✅ **Error Logging**

## 🌐 Access URLs

### **Local Development:**
- **Full Demo**: http://localhost:3000/demo-registration.html
- **Quick Tester**: http://localhost:3000/api-tester.html

### **Production:**
- **Full Demo**: https://your-domain.com/demo-registration.html
- **Quick Tester**: https://your-domain.com/api-tester.html

## 🧪 Testing Scenarios

### **1. Health Check Testing**
```javascript
// Test API health
GET /api/health
```

### **2. Company Registration Testing**
```javascript
// Test company registration
POST /api/v1/auth/register/company
{
  "email": "testcompany@demo.com",
  "password": "MySecureCompanyPass2024!@#",
  "legalBusinessName": "Demo Company Ltd",
  "registrationNumber": "123456789",
  "vatNumber": "FI12345678",
  "industry": "Technology",
  // ... other fields
}
```

### **3. Educational Institute Registration Testing**
```javascript
// Test educational institute registration
POST /api/v1/auth/register/educational-institute
{
  "email": "testinstitute@demo.com",
  "password": "MySecureInstitutePass2024!@#",
  "instituteName": "Demo University",
  "accreditationNumber": "ACC123456789",
  "instituteType": "university",
  // ... other fields
}
```

### **4. Freelancer Registration Testing**
```javascript
// Test freelancer registration
POST /api/v1/auth/register/freelancer
{
  "email": "testfreelancer@demo.com",
  "password": "MySecureFreelancerPass2024!@#",
  "fullName": "Alex Johnson",
  "dateOfBirth": "1990-01-01",
  "countryOfCitizenship": "Finland",
  "finnishIdentityCode": "010190-123A",
  // ... other fields
}
```

### **5. Document Upload Testing**
```javascript
// Test document upload
POST /api/v1/documents/upload
Content-Type: multipart/form-data

FormData:
- document: [file1]
- document: [file2]
- ...
```

## 🔧 Demo Page Configuration

### **API Base URL Configuration**
The demo pages are configured to use `http://localhost:3000` by default. To change this:

```javascript
// In the demo pages, update the apiBaseUrl
apiBaseUrl: 'https://your-api-domain.com'
```

### **Pre-filled Test Data**
The demo pages include pre-filled test data for easy testing:

#### **Company Test Data:**
- Email: `testcompany@demo.com`
- Password: `MySecureCompanyPass2024!@#`
- Business Name: `Demo Company Ltd`
- Industry: `Technology`

#### **Educational Institute Test Data:**
- Email: `testinstitute@demo.com`
- Password: `MySecureInstitutePass2024!@#`
- Institute Name: `Demo University`
- Type: `university`

#### **Freelancer Test Data:**
- Email: `testfreelancer@demo.com`
- Password: `MySecureFreelancerPass2024!@#`
- Name: `Alex Johnson`
- Country: `Finland`

## 📊 Demo Page Features

### **Real-time Monitoring**
- API health status indicators
- Response time tracking
- Success/failure rate monitoring
- Live error logging

### **Interactive Forms**
- Form validation
- Real-time feedback
- Error message display
- Success notifications

### **Document Management**
- File selection interface
- Upload progress tracking
- Document status display
- File type validation

### **API Response Logging**
- Complete request/response logging
- JSON response formatting
- Error tracking
- Performance metrics

## 🚀 Getting Started

### **1. Start the API Server**
```bash
cd codfleet-api
npm run dev
```

### **2. Open Demo Pages**
- Navigate to http://localhost:3000/demo-registration.html
- Or http://localhost:3000/api-tester.html

### **3. Test APIs**
- Click the test buttons to run API tests
- Fill out forms to test registration
- Upload documents to test file handling

## 🔍 Troubleshooting

### **Common Issues:**

#### **1. API Not Responding**
- Check if the server is running on port 3000
- Verify the API base URL configuration
- Check browser console for CORS errors

#### **2. Registration Failures**
- Ensure all required fields are filled
- Check password strength requirements
- Verify email format and uniqueness

#### **3. Document Upload Issues**
- Check file size limits (10MB max)
- Verify file types (PDF, JPG, PNG, DOC, DOCX)
- Ensure proper form data encoding

#### **4. CORS Errors**
- Verify API server is running
- Check middleware configuration
- Ensure proper headers are set

## 📈 Performance Monitoring

### **Response Time Tracking**
- Health check: ~16ms
- Company registration: ~4.3s
- Educational registration: ~4.2s
- Freelancer registration: ~3.8s
- Document upload: ~2-5s

### **Success Rate Monitoring**
- Track successful registrations
- Monitor error rates
- Log failed attempts
- Analyze performance patterns

## 🔒 Security Features

### **Client-Side Security**
- Input validation
- File type checking
- Size limit enforcement
- XSS prevention

### **API Security**
- Rate limiting
- Input sanitization
- File upload security
- Authentication tokens

## 📝 Customization

### **Adding New Test Cases**
```javascript
// Add new test function
async testNewEndpoint() {
    // Implementation
}
```

### **Modifying UI**
- Update Tailwind CSS classes
- Modify Alpine.js data properties
- Add new form fields
- Customize styling

### **API Integration**
- Update endpoint URLs
- Modify request payloads
- Add new headers
- Handle new response formats

## 🎉 Conclusion

The demo pages provide a comprehensive testing environment for the CodFleet registration APIs. They include:

- ✅ **Complete UI for all user types**
- ✅ **Document upload functionality**
- ✅ **Real-time API monitoring**
- ✅ **Error handling and logging**
- ✅ **Modern, responsive design**
- ✅ **Easy-to-use interface**

**Ready for testing and demonstration!** 🚀
