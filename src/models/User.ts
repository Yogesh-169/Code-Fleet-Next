import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

export const USER_ROLES = [
  'freelancer',
  'company_org_admin',
  'company_hiring_manager',
  'company_finance',
  'edu_institute_admin',
  'edu_institute_instructor',
  'admin',
  'compliance_officer',
  'support_agent',
  'field_master',
  'government_viewer',
] as const;

export const USER_TYPES = [
  'company',
  'educational_institute', 
  'freelancer'
] as const;

export type UserRole = typeof USER_ROLES[number];
export type UserType = typeof USER_TYPES[number];

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: false }, // Not required for OAuth users
    firstName: { type: String, maxlength: 50, trim: true },
    lastName: { type: String, maxlength: 50, trim: true },
    phone: { type: String, maxlength: 20, trim: true },
    bio: { type: String, maxlength: 1000, trim: true },
    skills: [{ type: String, maxlength: 50, trim: true }],
    experience: { 
      type: String, 
      enum: ['entry', 'intermediate', 'senior', 'expert'] 
    },
    location: {
      country: { type: String, maxlength: 100, trim: true },
      city: { type: String, maxlength: 100, trim: true },
      timezone: { type: String, maxlength: 50, trim: true }
    },
    availability: {
      status: { 
        type: String, 
        enum: ['available', 'busy', 'unavailable'],
        default: 'available'
      },
      hoursPerWeek: { type: Number, min: 1, max: 168 },
      noticePeriod: { type: String, maxlength: 100, trim: true }
    },
    socialLinks: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      portfolio: { type: String, trim: true }
    },
    roles: { type: [String], enum: USER_ROLES, required: true, default: ['freelancer'] },
    userType: { type: String, enum: USER_TYPES, required: true, default: 'freelancer' },
    
    // Authentication & Security
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, sparse: true },
    emailVerificationExpires: { type: Date },
    
    // OAuth providers
    oauthProviders: [{
      provider: { 
        type: String, 
        enum: ['google', 'microsoft', 'apple'],
        required: true 
      },
      providerId: { type: String, required: true },
      email: { type: String, required: true },
      name: { type: String },
      picture: { type: String },
      locale: { type: String, default: 'en' },
      connectedAt: { type: Date, default: Date.now },
      lastUsedAt: { type: Date, default: Date.now },
      isActive: { type: Boolean, default: true }
    }],
    
    // Password reset
    passwordResetToken: { type: String, sparse: true },
    passwordResetExpires: { type: Date },
    
    // Account security
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date },
    lastLoginAt: { type: Date },
    lastLoginIP: { type: String },
    
    // Refresh tokens (for production-ready auth)
    refreshTokens: [{
      token: { type: String, required: true },
      expiresAt: { type: Date, required: true },
      createdAt: { type: Date, default: Date.now },
      isRevoked: { type: Boolean, default: false },
      deviceInfo: {
        userAgent: String,
        ipAddress: String
      }
    }],
    
    // Two-factor authentication
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    twoFactorBackupCodes: [{ type: String }],
    
    // Account status
    isActive: { type: Boolean, default: true },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String },
    suspensionUntil: { type: Date },
    
    // Compliance flags for later gating (aligns with SRS)
    compliance: {
      kycVerified: { type: Boolean, default: false },
      businessId: { type: String, trim: true }, // Y-tunnus
      taxNumber: { type: String, trim: true },
      yelStatus: { type: String, trim: true },
      accidentInsurancePolicy: { type: String, trim: true },
      iban: { type: String, trim: true },
      greenLightMonth: { type: String, trim: true },
      complianceStatus: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected', 'expired'],
        default: 'pending'
      },
      lastComplianceCheck: { type: Date },
      requiredDocuments: [{
        type: { type: String, required: true },
        status: { 
          type: String, 
          enum: ['missing', 'uploaded', 'verified', 'rejected'],
          default: 'missing'
        },
        uploadedAt: { type: Date },
        verifiedAt: { type: Date },
        fileUrl: { type: String },
        notes: { type: String }
      }]
    },
    
    // Preferences
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      marketingEmails: { type: Boolean, default: false },
      language: { type: String, default: 'en', enum: ['en', 'fi', 'sv'] },
      timezone: { type: String, default: 'UTC' }
    },
    
    // User type specific fields
    companyInfo: {
      legalBusinessName: { type: String, trim: true },
      registrationNumber: { type: String, trim: true },
      vatNumber: { type: String, trim: true },
      industry: { type: String, trim: true },
      employeeCount: { type: String, trim: true },
      headquartersAddress: { type: String, trim: true },
      billingAddress: { type: String, trim: true },
      iban: { type: String, trim: true },
      primaryContactPerson: { type: String, trim: true },
      designation: { type: String, trim: true },
      userRolesSetup: { type: String, trim: true },
      twoFactorEnabled: { type: Boolean, default: false }
    },
    
    educationalInstituteInfo: {
      instituteName: { type: String, trim: true },
      accreditationNumber: { type: String, trim: true },
      instituteType: { type: String, enum: ['university', 'college', 'vocational_school', 'online_platform'] },
      websiteUrl: { type: String, trim: true },
      headquartersAddress: { type: String, trim: true },
      primaryContactPerson: { type: String, trim: true },
      designation: { type: String, trim: true },
      programsOffered: [{ type: String, trim: true }],
      courseLinks: [{ type: String, trim: true }],
      accreditationCertificate: { type: String, trim: true },
      insuranceDocs: [{ type: String, trim: true }],
      partnershipAgreement: { type: Boolean, default: false },
      twoFactorMethod: { type: String, enum: ['sms', 'app'] }
    },
    
    freelancerInfo: {
      fullName: { type: String, trim: true },
      dateOfBirth: { type: Date },
      countryOfCitizenship: { type: String, trim: true },
      finnishIdentityCode: { type: String, trim: true },
      primaryAddress: { type: String, trim: true },
      passportId: { type: String, trim: true },
      residencePermit: { type: String, trim: true },
      businessId: { type: String, trim: true },
      iban: { type: String, trim: true },
      taxRegistrationStatus: { type: String, enum: ['registered', 'not_registered'] },
      vatStatus: { type: String, enum: ['vat_registered', 'not_vat_registered'] },
      taxCard: { type: String, trim: true },
      twoFactorEnabled: { type: Boolean, default: false }
    },

    // Document storage
    documents: [{
      type: { type: String, required: true },
      fileName: { type: String, required: true },
      originalName: { type: String, required: true },
      filePath: { type: String, required: true },
      mimeType: { type: String, required: true },
      size: { type: Number, required: true },
      hash: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
      status: { 
        type: String, 
        enum: ['pending_review', 'approved', 'rejected', 'needs_revision'],
        default: 'pending_review'
      },
      reviewNotes: { type: String },
      reviewedAt: { type: Date },
      reviewedBy: { type: String }
    }],

    // Audit trail
    lastPasswordChange: { type: Date, default: Date.now },
    emailChangeRequest: {
      newEmail: { type: String },
      token: { type: String },
      expires: { type: Date }
    }
  },
  { 
    timestamps: true,
    toJSON: { 
      transform: function(doc, ret) {
        delete ret.passwordHash;
        delete ret.emailVerificationToken;
        delete ret.passwordResetToken;
        delete ret.twoFactorSecret;
        delete ret.refreshTokens;
        return ret;
      }
    }
  }
);

// Add indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ 'emailVerificationToken': 1 });
UserSchema.index({ 'passwordResetToken': 1 });
UserSchema.index({ 'roles': 1 });
UserSchema.index({ 'isActive': 1 });
UserSchema.index({ 'isEmailVerified': 1 });
UserSchema.index({ 'compliance.complianceStatus': 1 });
UserSchema.index({ 'compliance.kycVerified': 1 });
UserSchema.index({ 'lockoutUntil': 1 });
UserSchema.index({ 'lastLoginAt': -1 });
UserSchema.index({ 'createdAt': -1 });

// OAuth provider indexes
UserSchema.index({ 'oauthProviders.provider': 1, 'oauthProviders.providerId': 1 });
UserSchema.index({ 'oauthProviders.provider': 1, 'oauthProviders.email': 1 });
UserSchema.index({ 'oauthProviders.providerId': 1 });

// Compound indexes
UserSchema.index({ 'isActive': 1, 'isEmailVerified': 1 });
UserSchema.index({ 'roles': 1, 'isActive': 1 });
UserSchema.index({ 'compliance.complianceStatus': 1, 'isActive': 1 });
UserSchema.index({ 'oauthProviders.provider': 1, 'isActive': 1 });

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel: Model<User> =
  (mongoose.models.User as Model<User>) || mongoose.model<User>('User', UserSchema);


