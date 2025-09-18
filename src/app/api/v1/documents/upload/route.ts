import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/models/User';
import { FileUploadService, DOCUMENT_TYPES } from '@/lib/file-upload';
import { SecurityUtils, SECURITY_HEADERS } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    if (!token) {
      return NextResponse.json({ 
        error: 'Authorization token required' 
      }, { 
        status: 401,
        headers: SECURITY_HEADERS
      });
    }

    // Verify JWT token (simplified - in production use proper JWT verification)
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID not found in token' 
      }, { 
        status: 401,
        headers: SECURITY_HEADERS
      });
    }

    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    
    // Rate limiting for file uploads
    const rl = rateLimit(`file-upload:${userId}:${ip}`, 10, 60_000); // 10 uploads per minute
    if (!rl.ok) {
      return NextResponse.json({ 
        error: 'Too many file upload attempts', 
        retryAfter: Math.ceil((rl.retryAfterMs || 0) / 1000)
      }, { 
        status: 429,
        headers: SECURITY_HEADERS
      });
    }

    await connectToDatabase();

    // Get user to determine document types
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { 
        status: 404,
        headers: SECURITY_HEADERS
      });
    }

    // Handle file uploads
    const uploadedFiles = await FileUploadService.handleFileUpload(
      req, 
      userId, 
      'document'
    );

    if (uploadedFiles.length === 0) {
      return NextResponse.json({ 
        error: 'No files uploaded' 
      }, { 
        status: 400,
        headers: SECURITY_HEADERS
      });
    }

    // Determine document types based on user type and file names
    const documents = uploadedFiles.map(file => {
      let documentType = 'general';
      
      if (user.userType === 'company') {
        if (file.originalName.toLowerCase().includes('business')) {
          documentType = DOCUMENT_TYPES.COMPANY.BUSINESS_EXTRACT;
        } else if (file.originalName.toLowerCase().includes('vat')) {
          documentType = DOCUMENT_TYPES.COMPANY.VAT_CERTIFICATE;
        } else if (file.originalName.toLowerCase().includes('contractor')) {
          documentType = DOCUMENT_TYPES.COMPANY.CONTRACTOR_OBLIGATIONS;
        } else {
          documentType = DOCUMENT_TYPES.COMPANY.INSURANCE_DOCS;
        }
      } else if (user.userType === 'educational_institute') {
        if (file.originalName.toLowerCase().includes('accreditation')) {
          documentType = DOCUMENT_TYPES.EDUCATIONAL_INSTITUTE.ACCREDITATION_CERTIFICATE;
        } else if (file.originalName.toLowerCase().includes('partnership')) {
          documentType = DOCUMENT_TYPES.EDUCATIONAL_INSTITUTE.PARTNERSHIP_AGREEMENT;
        } else {
          documentType = DOCUMENT_TYPES.EDUCATIONAL_INSTITUTE.INSURANCE_DOCS;
        }
      } else if (user.userType === 'freelancer') {
        if (file.originalName.toLowerCase().includes('passport')) {
          documentType = DOCUMENT_TYPES.FREELANCER.PASSPORT_ID;
        } else if (file.originalName.toLowerCase().includes('residence')) {
          documentType = DOCUMENT_TYPES.FREELANCER.RESIDENCE_PERMIT;
        } else if (file.originalName.toLowerCase().includes('tax')) {
          documentType = DOCUMENT_TYPES.FREELANCER.TAX_CARD;
        } else {
          documentType = DOCUMENT_TYPES.FREELANCER.BUSINESS_LICENSE;
        }
      }

      return {
        type: documentType,
        fileName: file.fileName,
        originalName: file.originalName,
        filePath: file.filePath,
        mimeType: file.mimeType,
        size: file.size,
        hash: file.hash,
        uploadedAt: file.uploadedAt,
        status: 'pending_review'
      };
    });

    // Update user with new documents
    await UserModel.findByIdAndUpdate(userId, {
      $push: { documents: { $each: documents } }
    });

    return NextResponse.json({ 
      message: 'Files uploaded successfully',
      documents: documents.map(doc => ({
        type: doc.type,
        originalName: doc.originalName,
        size: doc.size,
        status: doc.status,
        uploadedAt: doc.uploadedAt
      })),
      totalDocuments: user.documents.length + documents.length
    }, { 
      status: 201,
      headers: SECURITY_HEADERS
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    return NextResponse.json({ 
      error: 'File upload failed. Please try again later.',
      code: 'FILE_UPLOAD_ERROR'
    }, { 
      status: 500,
      headers: SECURITY_HEADERS
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

    if (!token) {
      return NextResponse.json({ 
        error: 'Authorization token required' 
      }, { 
        status: 401,
        headers: SECURITY_HEADERS
      });
    }

    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID not found in token' 
      }, { 
        status: 401,
        headers: SECURITY_HEADERS
      });
    }

    await connectToDatabase();

    const user = await UserModel.findById(userId).select('documents');
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { 
        status: 404,
        headers: SECURITY_HEADERS
      });
    }

    return NextResponse.json({ 
      documents: user.documents.map(doc => ({
        id: doc._id,
        type: doc.type,
        originalName: doc.originalName,
        size: doc.size,
        status: doc.status,
        uploadedAt: doc.uploadedAt,
        reviewNotes: doc.reviewNotes,
        reviewedAt: doc.reviewedAt
      })),
      totalDocuments: user.documents.length
    }, { 
      status: 200,
      headers: SECURITY_HEADERS
    });

  } catch (error) {
    console.error('Get documents error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to retrieve documents',
      code: 'GET_DOCUMENTS_ERROR'
    }, { 
      status: 500,
      headers: SECURITY_HEADERS
    });
  }
}
