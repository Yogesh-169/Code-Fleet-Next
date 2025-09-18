import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { UserModel, USER_ROLES, type UserRole } from '@/models/User';
import { hashPassword, generateEmailVerificationToken } from '@/lib/auth';
import { hashToken } from '@/lib/crypto-utils';
import { sendEmail } from '@/lib/mailer';
import { rateLimit } from '@/lib/rate-limit';
import { validatePasswordPolicy } from '@/lib/password';

const freelancerRegisterSchema = z.object({
  // Basic account info
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(12),
  language: z.enum(['en', 'fi', 'sv']).default('en'),
  timezone: z.string().max(50).default('UTC'),
  
  // Identity & Right to Work
  fullName: z.string().min(1).max(100).trim(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  countryOfCitizenship: z.string().min(1).max(100).trim(),
  finnishIdentityCode: z.string().min(1).max(20).trim(),
  primaryAddress: z.string().min(1).max(500).trim(),
  passportId: z.string().optional(),
  residencePermit: z.string().optional(),
  
  // Business & Tax
  businessId: z.string().optional(),
  iban: z.string().min(1).max(50).trim(),
  taxRegistrationStatus: z.enum(['registered', 'not_registered']),
  vatStatus: z.enum(['vat_registered', 'not_vat_registered']),
  taxCard: z.string().optional(),
  
  // Account setup
  twoFactorEnabled: z.boolean().default(false),
  
  // Compliance declarations
  informationAccurate: z.boolean().refine(val => val === true, {
    message: "You must confirm that all information provided is accurate and complete"
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must agree to CodFleet's terms and conditions"
  }),
  falseInformationUnderstood: z.boolean().refine(val => val === true, {
    message: "You must understand that providing false information may result in account termination"
  })
});

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Rate limiting for freelancer registration
    const rl = rateLimit(`freelancer-register:${ip}`, 5, 60_000); // 5 attempts per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many registration attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { status: 429 });
    }

    const body = await req.json();
    const parsed = freelancerRegisterSchema.parse(body);

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

    // Validate Finnish identity code format (basic validation)
    if (parsed.countryOfCitizenship.toLowerCase() === 'finland') {
      const finnishIdPattern = /^\d{6}[+-A]\d{3}[0-9A-FHJ-NPR-Y]$/;
      if (!finnishIdPattern.test(parsed.finnishIdentityCode)) {
        return NextResponse.json({ 
          error: 'Invalid Finnish personal identity code format',
          code: 'INVALID_FINNISH_ID'
        }, { status: 400 });
      }
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

    // Create freelancer user
    const user = await UserModel.create({
      email: parsed.email.toLowerCase(),
      passwordHash,
      firstName: parsed.fullName.split(' ')[0] || '',
      lastName: parsed.fullName.split(' ').slice(1).join(' ') || '',
      phone: '', // Will be filled later
      roles: ['freelancer'],
      userType: 'freelancer',
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
      freelancerInfo: {
        fullName: parsed.fullName,
        dateOfBirth: new Date(parsed.dateOfBirth),
        countryOfCitizenship: parsed.countryOfCitizenship,
        finnishIdentityCode: parsed.finnishIdentityCode,
        primaryAddress: parsed.primaryAddress,
        passportId: parsed.passportId,
        residencePermit: parsed.residencePermit,
        businessId: parsed.businessId,
        iban: parsed.iban,
        taxRegistrationStatus: parsed.taxRegistrationStatus,
        vatStatus: parsed.vatStatus,
        taxCard: parsed.taxCard,
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
        <p>Thank you for joining the CodFleet network. We're excited to help you work legally, get paid securely, and grow your career.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Freelancer Information</h3>
          <p><strong>Name:</strong> ${parsed.fullName}</p>
          <p><strong>Country:</strong> ${parsed.countryOfCitizenship}</p>
          <p><strong>Tax Status:</strong> ${parsed.taxRegistrationStatus === 'registered' ? 'Registered' : 'Not Registered'}</p>
          <p><strong>VAT Status:</strong> ${parsed.vatStatus === 'vat_registered' ? 'VAT Registered' : 'Not VAT Registered'}</p>
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
          <p style="margin: 0; color: #666;">Once verified, our team will review your application and documents. You'll receive notifications about your application status. If approved, you can start applying for projects and working with clients on CodFleet.</p>
        </div>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h4 style="color: #f57c00; margin-top: 0;">Important Reminders</h4>
          <ul style="margin: 0; color: #666; padding-left: 20px;">
            <li>Ensure all uploaded documents are clear and legible</li>
            <li>Keep your contact information up to date</li>
            <li>Review our terms and conditions carefully</li>
          </ul>
        </div>
      </div>
    `;

    await sendEmail({
      to: parsed.email,
      subject: 'Verify your CodFleet freelancer account',
      html: emailHtml
    });

    const responseTime = Date.now() - startTime;

    return NextResponse.json({ 
      message: 'Freelancer registration successful. Please check your email to verify your account.',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        userType: user.userType,
        isEmailVerified: user.isEmailVerified,
        freelancerInfo: {
          fullName: user.freelancerInfo.fullName,
          countryOfCitizenship: user.freelancerInfo.countryOfCitizenship,
          taxRegistrationStatus: user.freelancerInfo.taxRegistrationStatus,
          vatStatus: user.freelancerInfo.vatStatus
        },
        createdAt: user.createdAt
      },
      devEmailVerificationToken: verificationToken, // Only for development
      meta: {
        responseTime: `${responseTime}ms`
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Freelancer registration error:', error);
    
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
      error: 'Freelancer registration failed. Please try again later.',
      code: 'FREELANCER_REGISTER_ERROR'
    }, { status: 500 });
  }
}
