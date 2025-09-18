# 🔍 CodFleet API Validation Guide

This guide explains how the API validates data and what makes data "valid" or "invalid".

## ✅ **The API is Working Correctly!**

The "Invalid data found" errors you're seeing are **GOOD** - they mean the API is properly validating your data and rejecting invalid inputs. This is exactly what should happen in a production system.

## 🎯 **Why You Get "Invalid Data Found" Errors**

### **1. Required Fields Missing**
```json
// ❌ INVALID - Missing required fields
{
  "email": "test@example.com",
  "password": "password123"
  // Missing: legalBusinessName, registrationNumber, etc.
}

// ✅ VALID - All required fields present
{
  "email": "test@example.com",
  "password": "MySecurePass2024!@#",
  "legalBusinessName": "Test Company Ltd",
  "registrationNumber": "123456789",
  "vatNumber": "FI12345678",
  "industry": "Technology",
  "headquartersAddress": "Helsinki, Finland",
  "primaryContactPerson": "John Doe",
  "designation": "CEO",
  "phone": "+358123456789",
  "billingAddress": "Helsinki, Finland",
  "iban": "FI1234567890123456",
  "informationAccurate": true,
  "termsAccepted": true,
  "responsibilitiesUnderstood": true
}
```

### **2. Invalid Data Format**
```json
// ❌ INVALID - Wrong email format
{
  "email": "not-an-email",
  "password": "password123"
}

// ❌ INVALID - Weak password
{
  "email": "test@example.com",
  "password": "123"
}

// ✅ VALID - Proper format
{
  "email": "test@example.com",
  "password": "MySecurePass2024!@#"
}
```

### **3. Business Rule Violations**
```json
// ❌ INVALID - Empty required fields
{
  "legalBusinessName": "",
  "registrationNumber": "",
  "vatNumber": ""
}

// ❌ INVALID - False compliance checkboxes
{
  "informationAccurate": false,
  "termsAccepted": false
}

// ✅ VALID - All fields filled and checkboxes true
{
  "legalBusinessName": "Test Company Ltd",
  "registrationNumber": "123456789",
  "vatNumber": "FI12345678",
  "informationAccurate": true,
  "termsAccepted": true
}
```

## 📋 **Valid Data Examples**

### **Company Registration - Valid Data**
```json
{
  "email": "testcompany@example.com",
  "password": "MySecureCompanyPass2024!@#",
  "legalBusinessName": "Test Company Ltd",
  "registrationNumber": "123456789",
  "vatNumber": "FI12345678",
  "industry": "Technology",
  "employeeCount": "50-100",
  "headquartersAddress": "Helsinki, Finland",
  "primaryContactPerson": "John Doe",
  "designation": "CEO",
  "phone": "+358123456789",
  "billingAddress": "Helsinki, Finland",
  "iban": "FI1234567890123456",
  "userRolesSetup": "Admin, Hiring Manager",
  "twoFactorEnabled": false,
  "informationAccurate": true,
  "termsAccepted": true,
  "responsibilitiesUnderstood": true
}
```

### **Educational Institute Registration - Valid Data**
```json
{
  "email": "testinstitute@example.com",
  "password": "MySecureInstitutePass2024!@#",
  "instituteName": "Test University",
  "accreditationNumber": "ACC123456789",
  "instituteType": "university",
  "websiteUrl": "https://test.edu",
  "headquartersAddress": "Helsinki, Finland",
  "primaryContactPerson": "Jane Smith",
  "designation": "Head of Partnerships",
  "phone": "+358123456789",
  "programsOffered": ["Computer Science", "Data Science"],
  "courseLinks": ["https://test.edu/cs101"],
  "partnershipAgreement": true,
  "twoFactorMethod": "app"
}
```

### **Freelancer Registration - Valid Data**
```json
{
  "email": "testfreelancer@example.com",
  "password": "MySecureFreelancerPass2024!@#",
  "fullName": "Alex Johnson",
  "dateOfBirth": "1990-01-01",
  "countryOfCitizenship": "Finland",
  "finnishIdentityCode": "010190-123A",
  "primaryAddress": "Helsinki, Finland",
  "iban": "FI1234567890123456",
  "taxRegistrationStatus": "registered",
  "vatStatus": "not_vat_registered",
  "twoFactorEnabled": false,
  "informationAccurate": true,
  "termsAccepted": true,
  "falseInformationUnderstood": true
}
```

## 🔧 **How to Test with Valid Data**

### **1. Use the Test Page**
Visit: `http://localhost:3000/test-valid-data.html`

This page shows you:
- ✅ Valid data examples for each user type
- ✅ One-click testing with valid data
- ✅ Real-time API responses
- ✅ Success/failure indicators

### **2. Use the Registration Pages**
- **Main Registration**: `http://localhost:3000/register.html`
- **Company Registration**: `http://localhost:3000/register-company.html`

These pages have:
- ✅ Pre-filled valid data
- ✅ Form validation
- ✅ Real document upload
- ✅ Success confirmation

### **3. Use cURL with Valid Data**
```bash
# Test Company Registration
curl -X POST http://localhost:3000/api/v1/auth/register/company \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testcompany@example.com",
    "password": "MySecureCompanyPass2024!@#",
    "legalBusinessName": "Test Company Ltd",
    "registrationNumber": "123456789",
    "vatNumber": "FI12345678",
    "industry": "Technology",
    "headquartersAddress": "Helsinki, Finland",
    "primaryContactPerson": "John Doe",
    "designation": "CEO",
    "phone": "+358123456789",
    "billingAddress": "Helsinki, Finland",
    "iban": "FI1234567890123456",
    "informationAccurate": true,
    "termsAccepted": true,
    "responsibilitiesUnderstood": true
  }'
```

## 🚨 **Common Validation Errors**

### **1. Email Already Exists**
```json
{
  "error": "Email already registered but not verified. Please check your email or request a new verification link."
}
```
**Solution**: Use a different email address or check your email for verification.

### **2. Rate Limiting**
```json
{
  "error": "Too many registration attempts",
  "retryAfter": 37
}
```
**Solution**: Wait for the specified time before trying again.

### **3. Validation Errors**
```json
{
  "error": "Invalid request data",
  "details": [
    {
      "code": "too_small",
      "minimum": 12,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 12 character(s)",
      "path": ["password"]
    }
  ]
}
```
**Solution**: Fix the validation errors shown in the details.

### **4. Missing Required Fields**
```json
{
  "error": "Invalid request data",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["legalBusinessName"]
    }
  ]
}
```
**Solution**: Include all required fields in your request.

## 🎯 **Testing Strategy**

### **1. Start with Valid Data**
- Use the provided valid data examples
- Test one endpoint at a time
- Check the response for success

### **2. Test Edge Cases**
- Try with missing fields
- Test with invalid formats
- Test with weak passwords
- Test with duplicate emails

### **3. Test Real Scenarios**
- Use the registration pages
- Fill out forms completely
- Upload real documents
- Test the complete flow

## 🔍 **How Validation Works**

### **1. Client-Side Validation**
- Form validation in the browser
- Real-time feedback
- Prevents invalid submissions

### **2. Server-Side Validation**
- Zod schema validation
- Business rule checking
- Data sanitization

### **3. Database Validation**
- Unique constraints
- Data type validation
- Referential integrity

## ✅ **Success Indicators**

### **Successful Registration Response**
```json
{
  "message": "Company registration successful. Please check your email to verify your account.",
  "user": {
    "id": "68c551ff38335ff677190294",
    "email": "testcompany@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["company_org_admin"],
    "userType": "company",
    "isEmailVerified": false,
    "companyInfo": {
      "legalBusinessName": "Test Company Ltd",
      "industry": "Technology",
      "primaryContactPerson": "John Doe"
    },
    "createdAt": "2025-09-13T11:14:07.816Z"
  },
  "devEmailVerificationToken": "63336de4be1c2101079b991e9e650ec0b48425c9018b3ea7a98250bbbd99de25",
  "meta": {
    "responseTime": "3371ms"
  }
}
```

## 🎉 **Conclusion**

The API is working perfectly! The "Invalid data found" errors are **expected behavior** when you send incomplete or invalid data. This is exactly what a production API should do:

- ✅ **Validates all input data**
- ✅ **Rejects invalid requests**
- ✅ **Provides clear error messages**
- ✅ **Protects against bad data**
- ✅ **Maintains data integrity**

**To test successfully, use the valid data examples provided! 🚀**
