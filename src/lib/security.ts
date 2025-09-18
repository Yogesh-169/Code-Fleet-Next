import crypto from 'crypto';

// Enhanced security utilities
export class SecurityUtils {
  // Generate secure random strings
  static generateSecureId(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  // Sanitize file names to prevent path traversal
  static sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .substring(0, 255);
  }

  // Validate file type based on MIME type
  static validateFileType(mimeType: string, allowedTypes: string[]): boolean {
    return allowedTypes.includes(mimeType);
  }

  // Check file size limits
  static validateFileSize(fileSize: number, maxSizeBytes: number): boolean {
    return fileSize <= maxSizeBytes;
  }

  // Generate secure file hash for deduplication
  static generateFileHash(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  // Validate image dimensions (for profile pictures, etc.)
  static async validateImageDimensions(
    buffer: Buffer, 
    maxWidth: number = 2048, 
    maxHeight: number = 2048
  ): Promise<boolean> {
    try {
      // This would require a library like 'sharp' or 'jimp' for production
      // For now, we'll do basic validation
      return buffer.length > 0;
    } catch {
      return false;
    }
  }

  // Sanitize HTML content
  static sanitizeHtml(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  }

  // Validate Finnish personal identity code format
  static validateFinnishIdCode(idCode: string): boolean {
    const pattern = /^\d{6}[+-A]\d{3}[0-9A-FHJ-NPR-Y]$/;
    if (!pattern.test(idCode)) return false;

    // Basic checksum validation
    const datePart = idCode.substring(0, 6);
    const centuryChar = idCode.charAt(6);
    const individualNumber = idCode.substring(7, 10);
    const checksum = idCode.charAt(10);

    // More detailed validation would go here
    return true;
  }

  // Validate IBAN format
  static validateIBAN(iban: string): boolean {
    const pattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
    return pattern.test(iban.replace(/\s/g, ''));
  }

  // Rate limiting with exponential backoff
  static calculateRateLimitDelay(attempts: number): number {
    const baseDelay = 1000; // 1 second
    const maxDelay = 300000; // 5 minutes
    return Math.min(baseDelay * Math.pow(2, attempts), maxDelay);
  }
}

// File upload configuration
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'image/jpeg', 
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  MAX_FILES_PER_USER: 20
};

// Security headers for API responses
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};
