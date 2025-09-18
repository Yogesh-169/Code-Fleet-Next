import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel, USER_ROLES, type UserRole } from '@/models/User';
import { hashPassword, generateEmailVerificationToken } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { sendEmail } from '@/lib/mailer';
import { rateLimit } from '@/lib/rate-limit';
import { validatePasswordPolicy } from '@/lib/password';

const educationalInstituteRegisterSchema = z.object({
  // Basic account info
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(12),
  language: z.enum(['en', 'fi', 'sv']).default('en'),
  timezone: z.string().max(50).default('UTC'),
  
  // Institute information
  instituteName: z.string().min(1).max(200).trim(),
  accreditationNumber: z.string().min(1).max(100).trim(),
  instituteType: z.enum(['university', 'college', 'vocational_school', 'online_platform']),
  websiteUrl: z.string().url().max(500).trim(),
  headquartersAddress: z.string().min(1).max(500).trim(),
  
  // Contact information
  primaryContactPerson: z.string().min(1).max(100).trim(),
  designation: z.string().min(1).max(100).trim(),
  phone: z.string().max(20).trim(),
  
  // Programs & Course Linking
  programsOffered: z.array(z.string().trim()).min(1, "At least one program must be specified"),
  courseLinks: z.array(z.string().url()).optional().default([]),
  
  // Compliance & Partnership
  accreditationCertificate: z.string().optional(),
  insuranceDocs: z.array(z.string()).optional().default([]),
  partnershipAgreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the Partnership Agreement"
  }),
  
  // Account setup
  twoFactorMethod: z.enum(['sms', 'app']).default('app')
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Rate limiting for educational institute registration
    const rl = rateLimit(`edu-register:${ip}`, 3, 60_000); // 3 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many registration attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const parsed = educationalInstituteRegisterSchema.parse(body);

    // Validate password strength
    const passwordValidation = validatePasswordPolicy(parsed.password);
    if (!passwordValidation.ok) {
      return NextResponse.json({ 
        error: 'Password does not meet security requirements',
        details: passwordValidation.message,
        suggestions: [
          'Use at least 12 characters',
          'Include uppercase and lowercase letters',
          'Add numbers and special characters',
          'Avoid common words or patterns'
        ]
      }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ 
      email: parsed.email.toLowerCase(),
      isActive: true 
    });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return NextResponse.json({ 
          error: 'Email already registered' 
        }, { status: 409 });
      } else {
        return NextResponse.json({ 
          error: 'Email already registered but not verified. Please check your email or request a new verification link.' 
        }, { status: 409 });
      }
    }

    // Generate secure tokens
    const verificationToken = generateEmailVerificationToken();
    const hashedToken = await hashToken(verificationToken);
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const passwordHash = await hashPassword(parsed.password);

    // Create educational institute user
    const user = await UserModel.create({
      email: parsed.email.toLowerCase(),
      passwordHash,
      firstName: parsed.primaryContactPerson.split(' ')[0] || '',
      lastName: parsed.primaryContactPerson.split(' ').slice(1).join(' ') || '',
      phone: parsed.phone?.trim(),
      roles: ['edu_institute_admin'],
      userType: 'educational_institute',
      isEmailVerified: false,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: expires,
      preferences: { 
        language: parsed.language, 
        timezone: parsed.timezone, 
        emailNotifications: true, 
        smsNotifications: false, 
        marketingEmails: false 
      },
      educationalInstituteInfo: {
        instituteName: parsed.instituteName,
        accreditationNumber: parsed.accreditationNumber,
        instituteType: parsed.instituteType,
        websiteUrl: parsed.websiteUrl,
        headquartersAddress: parsed.headquartersAddress,
        primaryContactPerson: parsed.primaryContactPerson,
        designation: parsed.designation,
        programsOffered: parsed.programsOffered,
        courseLinks: parsed.courseLinks,
        accreditationCertificate: parsed.accreditationCertificate,
        insuranceDocs: parsed.insuranceDocs,
        partnershipAgreement: parsed.partnershipAgreement,
        twoFactorMethod: parsed.twoFactorMethod
      },
      lastPasswordChange: new Date(),
      isActive: true
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/auth/verify?token=${verificationToken}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1766b5;">Welcome to CodFleet Educational Partnership!</h2>
        <p>Thank you for registering your educational institute with CodFleet. We're excited to partner with you in empowering freelancers through education.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Institute Information</h3>
          <p><strong>Institute Name:</strong> ${parsed.instituteName}</p>
          <p><strong>Type:</strong> ${parsed.instituteType.replace('_', ' ').toUpperCase()}</p>
          <p><strong>Accreditation:</strong> ${parsed.accreditationNumber}</p>
          <p><strong>Primary Contact:</strong> ${parsed.primaryContactPerson}</p>
          <p><strong>Programs Offered:</strong> ${parsed.programsOffered.join(', ')}</p>
        </div>
        
        <p>Please verify your email address to complete your registration:</p>
        <a href="${verificationUrl}" style="display: inline-block; background: #1766b5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
          Verify Email Address
        </a>
        
        <p style="color: #666; font-size: 14px;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
        
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours. If you didn't create an account, please ignore this email.
        </p>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #1976d2; margin-top: 0;">Next Steps</h4>
          <p style="margin: 0; color: #666;">Once verified, our team will review your application and notify you of the approval status. Upon approval, you'll receive further instructions on setting up your institute profile.</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: parsed.email,
      subject: 'Verify your CodFleet educational institute account',
      html: emailHtml
    });

    const responseTime = Date.now() - startTime;

    return NextResponse.json({ 
      message: 'Educational institute registration successful. Please check your email to verify your account.',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        educationalInstituteInfo: {
          instituteName: user.educationalInstituteInfo.instituteName,
          instituteType: user.educationalInstituteInfo.instituteType,
          programsOffered: user.educationalInstituteInfo.programsOffered,
          primaryContactPerson: user.educationalInstituteInfo.primaryContactPerson
        },
        createdAt: user.createdAt
      },
      devEmailVerificationToken: verificationToken, // Only for development
      meta: {
        responseTime: `${responseTime}ms`
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Educational institute registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    if (error?.code === 11000) {
      return NextResponse.json({ 
        error: 'Email already registered' 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Educational institute registration failed. Please try again later.',
      code: 'EDU_REGISTER_ERROR'
    }, { status: 500 });
  }
}
