import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel, USER_ROLES, type UserRole } from '@/models/User';
import { hashPassword, generateEmailVerificationToken } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { sendEmail } from '@/lib/mailer';
import { rateLimit } from '@/lib/rate-limit';
import { validatePasswordPolicy } from '@/lib/password';

const companyRegisterSchema = z.object({
  // Basic account info
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(12),
  language: z.enum(['en', 'fi', 'sv']).default('en'),
  timezone: z.string().max(50).default('UTC'),
  
  // Company information
  legalBusinessName: z.string().min(1).max(200).trim(),
  registrationNumber: z.string().min(1).max(100).trim(),
  vatNumber: z.string().min(1).max(100).trim(),
  industry: z.string().min(1).max(100).trim(),
  employeeCount: z.string().min(1).max(100).trim(),
  headquartersAddress: z.string().min(1).max(500).trim(),
  
  // Contact information
  primaryContactPerson: z.string().min(1).max(100).trim(),
  designation: z.string().min(1).max(100).trim(),
  phone: z.string().max(20).trim(),
  
  // Billing information
  billingAddress: z.string().min(1).max(500).trim(),
  iban: z.string().min(1).max(50).trim(),
  
  // Account setup
  userRolesSetup: z.string().min(1).max(200).trim(),
  twoFactorEnabled: z.boolean().default(false),
  
  // Compliance declarations
  informationAccurate: z.boolean().refine(val => val === true, {
    message: "You must confirm that all information provided is accurate and complete"
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must agree to CodFleet's terms and conditions"
  }),
  responsibilitiesUnderstood: z.boolean().refine(val => val === true, {
    message: "You must understand the responsibilities and obligations of a partner company"
  })
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Rate limiting for company registration
    const rl = rateLimit(`company-register:${ip}`, 3, 60_000); // 3 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many registration attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const parsed = companyRegisterSchema.parse(body);

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

    // Create company user
    const user = await UserModel.create({
      email: parsed.email.toLowerCase(),
      passwordHash,
      firstName: parsed.primaryContactPerson.split(' ')[0] || '',
      lastName: parsed.primaryContactPerson.split(' ').slice(1).join(' ') || '',
      phone: parsed.phone?.trim(),
      roles: ['company_org_admin'],
      userType: 'company',
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
      companyInfo: {
        legalBusinessName: parsed.legalBusinessName,
        registrationNumber: parsed.registrationNumber,
        vatNumber: parsed.vatNumber,
        industry: parsed.industry,
        employeeCount: parsed.employeeCount,
        headquartersAddress: parsed.headquartersAddress,
        billingAddress: parsed.billingAddress,
        iban: parsed.iban,
        primaryContactPerson: parsed.primaryContactPerson,
        designation: parsed.designation,
        userRolesSetup: parsed.userRolesSetup,
        twoFactorEnabled: parsed.twoFactorEnabled
      },
      lastPasswordChange: new Date(),
      isActive: true
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/auth/verify?token=${verificationToken}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1766b5;">Welcome to CodFleet!</h2>
        <p>Thank you for registering your company with CodFleet. We're excited to have you join our platform.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Company Information</h3>
          <p><strong>Legal Business Name:</strong> ${parsed.legalBusinessName}</p>
          <p><strong>Industry:</strong> ${parsed.industry}</p>
          <p><strong>Primary Contact:</strong> ${parsed.primaryContactPerson}</p>
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
      </div>
    `;

    await sendEmail({
      to: parsed.email,
      subject: 'Verify your CodFleet company account',
      html: emailHtml
    });

    const responseTime = Date.now() - startTime;

    return NextResponse.json({ 
      message: 'Company registration successful. Please check your email to verify your account.',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        companyInfo: {
          legalBusinessName: user.companyInfo.legalBusinessName,
          industry: user.companyInfo.industry,
          primaryContactPerson: user.companyInfo.primaryContactPerson
        },
        createdAt: user.createdAt
      },
      devEmailVerificationToken: verificationToken, // Only for development
      meta: {
        responseTime: `${responseTime}ms`
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Company registration error:', error);
    
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
      error: 'Company registration failed. Please try again later.',
      code: 'COMPANY_REGISTER_ERROR'
    }, { status: 500 });
  }
}
