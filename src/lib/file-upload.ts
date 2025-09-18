import { NextRequest } from 'next/server';
import { SecurityUtils, FILE_UPLOAD_CONFIG } from './security';
import { promises as fs } from 'fs';
import path from 'path';

export interface UploadedFile {
  originalName: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
  hash: string;
  uploadedAt: Date;
}

export class FileUploadService {
  private static async ensureUploadDir(): Promise<void> {
    try {
      await fs.access(FILE_UPLOAD_CONFIG.UPLOAD_DIR);
    } catch {
      await fs.mkdir(FILE_UPLOAD_CONFIG.UPLOAD_DIR, { recursive: true });
    }
  }

  static async handleFileUpload(
    request: NextRequest,
    userId: string,
    fileType: 'profile' | 'document' | 'certificate'
  ): Promise<UploadedFile[]> {
    await this.ensureUploadDir();

    const formData = await request.formData();
    const files: UploadedFile[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const file = await this.processFile(value, userId, fileType, key);
        if (file) {
          files.push(file);
        }
      }
    }

    return files;
  }

  private static async processFile(
    file: File,
    userId: string,
    fileType: string,
    fieldName: string
  ): Promise<UploadedFile | null> {
    try {
      // Validate file size
      if (!SecurityUtils.validateFileSize(file.size, FILE_UPLOAD_CONFIG.MAX_FILE_SIZE)) {
        throw new Error(`File ${file.name} exceeds maximum size limit`);
      }

      // Validate file type
      const allowedTypes = fileType === 'profile' 
        ? FILE_UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES
        : FILE_UPLOAD_CONFIG.ALLOWED_DOCUMENT_TYPES;

      if (!SecurityUtils.validateFileType(file.type, allowedTypes)) {
        throw new Error(`File type ${file.type} not allowed for ${fileType}`);
      }

      // Generate secure file name
      const fileExtension = path.extname(file.name);
      const sanitizedName = SecurityUtils.sanitizeFileName(file.name);
      const uniqueId = SecurityUtils.generateSecureId(16);
      const fileName = `${userId}_${fileType}_${uniqueId}${fileExtension}`;

      // Create user-specific directory
      const userDir = path.join(FILE_UPLOAD_CONFIG.UPLOAD_DIR, userId);
      await fs.mkdir(userDir, { recursive: true });

      // Save file
      const filePath = path.join(userDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Generate file hash for deduplication
      const hash = SecurityUtils.generateFileHash(buffer);
      
      // Check for duplicate files
      const existingFiles = await this.findFilesByHash(userDir, hash);
      if (existingFiles.length > 0) {
        console.log(`Duplicate file detected: ${file.name}`);
        return null; // Skip duplicate
      }

      await fs.writeFile(filePath, buffer);

      return {
        originalName: file.name,
        fileName,
        filePath,
        mimeType: file.type,
        size: file.size,
        hash,
        uploadedAt: new Date()
      };

    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      throw error;
    }
  }

  private static async findFilesByHash(directory: string, hash: string): Promise<string[]> {
    try {
      const files = await fs.readdir(directory);
      const matchingFiles: string[] = [];

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isFile()) {
          const fileBuffer = await fs.readFile(filePath);
          const fileHash = SecurityUtils.generateFileHash(fileBuffer);
          
          if (fileHash === hash) {
            matchingFiles.push(filePath);
          }
        }
      }

      return matchingFiles;
    } catch {
      return [];
    }
  }

  static async deleteFile(filePath: string): Promise<boolean> {
    try {
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async getUserFiles(userId: string): Promise<UploadedFile[]> {
    try {
      const userDir = path.join(FILE_UPLOAD_CONFIG.UPLOAD_DIR, userId);
      const files = await fs.readdir(userDir);
      const uploadedFiles: UploadedFile[] = [];

      for (const file of files) {
        const filePath = path.join(userDir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isFile()) {
          // Extract metadata from filename or store in separate metadata file
          uploadedFiles.push({
            originalName: file,
            fileName: file,
            filePath,
            mimeType: 'application/octet-stream', // Would need to store this separately
            size: stats.size,
            hash: '',
            uploadedAt: stats.birthtime
          });
        }
      }

      return uploadedFiles;
    } catch {
      return [];
    }
  }
}

// Document types for different user types
export const DOCUMENT_TYPES = {
  COMPANY: {
    BUSINESS_EXTRACT: 'business_extract',
    VAT_CERTIFICATE: 'vat_certificate',
    CONTRACTOR_OBLIGATIONS: 'contractor_obligations',
    INSURANCE_DOCS: 'insurance_docs'
  },
  EDUCATIONAL_INSTITUTE: {
    ACCREDITATION_CERTIFICATE: 'accreditation_certificate',
    INSURANCE_DOCS: 'insurance_docs',
    PARTNERSHIP_AGREEMENT: 'partnership_agreement'
  },
  FREELANCER: {
    PASSPORT_ID: 'passport_id',
    RESIDENCE_PERMIT: 'residence_permit',
    TAX_CARD: 'tax_card',
    BUSINESS_LICENSE: 'business_license'
  }
};
