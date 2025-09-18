import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { signJwt, signRefreshToken, hashToken } from '@/lib/auth';
import { getGoogleTokens, getGoogleUserInfo } from '@/lib/google-oauth';
import { rateLimit } from '@/lib/rate-limit';

const googleRegisterSchema = z.object({
  idToken: z.string().min(1, 'Google ID token is required'),
  userType: z.enum(['company', 'educational_institute', 'freelancer']),
  // Additional required fields based on user type
  phone: z.string().min(1, 'Phone number is required'),
  language: z.enum(['en', 'fi', 'sv']).default('en'),
  timezone: z.string().max(50).default('UTC'),
  
  // Company specific fields
  legalBusinessName: z.string().optional(),
  registrationNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  industry: z.string().optional(),
  headquartersAddress: z.string().optional(),
  primaryContactPerson: z.string().optional(),
  designation: z.string().optional(),
  iban: z.string().optional(),
  
  // Educational Institute specific fields
  instituteName: z.string().optional(),
  accreditationNumber: z.string().optional(),
  instituteType: z.enum(['university', 'college', 'vocational_school', 'online_platform']).optional(),
  websiteUrl: z.string().url().optional(),
  programsOffered: z.array(z.string()).optional(),
  courseLinks: z.array(z.string()).optional(),
  
  // Freelancer specific fields
  fullName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  countryOfCitizenship: z.string().optional(),
  finnishIdentityCode: z.string().optional(),
  primaryAddress: z.string().optional(),
  taxRegistrationStatus: z.enum(['registered', 'not_registered']).optional(),
  vatStatus: z.enum(['vat_registered', 'not_vat_registered']).optional(),
  
  // Compliance declarations
  informationAccurate: z.boolean().refine(val => val === true, {
    message: "You must confirm that all information provided is accurate and complete"
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must agree to CodFleet's terms and conditions"
  })
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = googleRegisterSchema.parse(body);

    // Rate limiting
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const rl = rateLimit(`google-register:${ip}`, 5, 60_000);
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many registration attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    // Verify Google ID token
    const googleUser = await getGoogleUserInfo(parsed.idToken);
    if (!googleUser) {
      return NextResponse.json({ 
        error: 'Invalid Google token' 
      }, { status: 401 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [
        { 'oauthProviders.provider': 'google', 'oauthProviders.providerId': googleUser.id },
        { email: googleUser.email.toLowerCase() }
      ],
      isActive: true
    });

    if (existingUser) {
      return NextResponse.json({ 
        error: 'User already exists. Please use login instead.' 
      }, { status: 409 });
    }

    // Determine roles based on user type
    let roles: string[];
    switch (parsed.userType) {
      case 'company':
        roles = ['company_org_admin'];
        break;
      case 'educational_institute':
        roles = ['edu_institute_admin'];
        break;
      case 'freelancer':
        roles = ['freelancer'];
        break;
      default:
        return NextResponse.json({ 
          error: 'Invalid user type' 
        }, { status: 400 });
    }

    // Create user based on type
    let userData: any = {
      email: googleUser.email.toLowerCase(),
      firstName: googleUser.given_name || '',
      lastName: googleUser.family_name || '',
      roles,
      userType: parsed.userType,
      isEmailVerified: true,
      phone: parsed.phone,
      oauthProviders: [{
        provider: 'google',
        providerId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        locale: googleUser.locale,
        connectedAt: new Date(),
        lastUsedAt: new Date(),
        isActive: true
      }],
      preferences: {
        language: parsed.language,
        timezone: parsed.timezone,
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false
      },
      lastPasswordChange: new Date(),
      isActive: true
    };

    // Add type-specific information
    if (parsed.userType === 'company') {
      userData.companyInfo = {
        legalBusinessName: parsed.legalBusinessName,
        registrationNumber: parsed.registrationNumber,
        vatNumber: parsed.vatNumber,
        industry: parsed.industry,
        headquartersAddress: parsed.headquartersAddress,
        primaryContactPerson: parsed.primaryContactPerson,
        designation: parsed.designation,
        iban: parsed.iban
      };
    } else if (parsed.userType === 'educational_institute') {
      userData.educationalInstituteInfo = {
        instituteName: parsed.instituteName,
        accreditationNumber: parsed.accreditationNumber,
        instituteType: parsed.instituteType,
        websiteUrl: parsed.websiteUrl,
        programsOffered: parsed.programsOffered,
        courseLinks: parsed.courseLinks
      };
    } else if (parsed.userType === 'freelancer') {
      userData.freelancerInfo = {
        fullName: parsed.fullName,
        dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : undefined,
        countryOfCitizenship: parsed.countryOfCitizenship,
        finnishIdentityCode: parsed.finnishIdentityCode,
        primaryAddress: parsed.primaryAddress,
        taxRegistrationStatus: parsed.taxRegistrationStatus,
        vatStatus: parsed.vatStatus
      };
    }

    // Create user
    const user = await UserModel.create(userData);

    // Generate tokens
    const accessToken = signJwt({ 
      sub: String(user._id), 
      roles: user.roles, 
      email: user.email,
      type: 'access',
      provider: 'google'
    });

    const refreshToken = signRefreshToken({ 
      sub: String(user._id), 
      type: 'refresh',
      provider: 'google'
    });

    // Store refresh token
    const hashedRefreshToken = await hashToken(refreshToken);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await UserModel.findByIdAndUpdate(user._id, {
      $push: {
        refreshTokens: {
          token: hashedRefreshToken,
          expiresAt: refreshTokenExpiry,
          deviceInfo: {
            userAgent: req.headers.get('user-agent') || 'unknown',
            ipAddress: ip
          }
        }
      }
    });

    return NextResponse.json({
      message: `${parsed.userType.charAt(0).toUpperCase() + parsed.userType.slice(1)} registration with Google successful`,
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 900, // 15 minutes
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        lastLoginAt: new Date(),
        preferences: user.preferences
      },
      meta: {
        responseTime: `${Date.now() - Date.now()}ms`
      }
    });

  } catch (error) {
    console.error('Google registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid request data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }

    return NextResponse.json({
      error: 'Google registration failed. Please try again later.',
      code: 'GOOGLE_REGISTER_ERROR'
    }, { status: 500 });
  }
}