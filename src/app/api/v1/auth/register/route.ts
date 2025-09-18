import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  userType: z.enum(['company', 'educational_institute', 'freelancer']),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(12),
  language: z.enum(['en', 'fi', 'sv']).default('en'),
  timezone: z.string().max(50).default('UTC'),
  // Other fields will be validated based on user type
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    // Create a new request with the same body for the specific handlers
    const newRequest = new Request(req.url, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify(body)
    });

    // Route to appropriate handler based on user type
    switch (parsed.userType) {
      case 'company':
        return await handleCompanyRegistration(newRequest);
      case 'educational_institute':
        return await handleEducationalInstituteRegistration(newRequest);
      case 'freelancer':
        return await handleFreelancerRegistration(newRequest);
      default:
        return NextResponse.json({ 
          error: 'Invalid user type. Must be company, educational_institute, or freelancer' 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Registration routing error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid request data',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Registration failed. Please try again later.',
      code: 'REGISTER_ERROR'
    }, { status: 500 });
  }
}

// Import the handlers from the specific registration files
async function handleCompanyRegistration(req: Request) {
  const { POST: companyRegister } = await import('./company/route');
  return companyRegister(req);
}

async function handleEducationalInstituteRegistration(req: Request) {
  const { POST: eduRegister } = await import('./educational-institute/route');
  return eduRegister(req);
}

async function handleFreelancerRegistration(req: Request) {
  const { POST: freelancerRegister } = await import('./freelancer/route');
  return freelancerRegister(req);
}