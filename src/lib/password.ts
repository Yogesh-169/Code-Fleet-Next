import { validatePasswordStrength } from './auth';

export function validatePasswordPolicy(password: string): { ok: boolean; message?: string } {
  const validation = validatePasswordStrength(password);
  
  if (!validation.isValid) {
    return { 
      ok: false, 
      message: validation.errors.join('. ') 
    };
  }
  
  return { ok: true };
}

// Additional password validation for specific use cases
export function validatePasswordForReset(password: string): { 
  isValid: boolean; 
  errors: string[] 
} {
  const validation = validatePasswordStrength(password);
  
  // Additional checks for password reset
  if (password.length < 8) {
    validation.errors.push('Password must be at least 8 characters long for reset');
    validation.isValid = false;
  }
  
  return validation;
}

// Check if password has been used recently (basic implementation)
export function isPasswordRecentlyUsed(password: string, passwordHistory: string[]): boolean {
  return passwordHistory.some(hashedPassword => {
    // In a real implementation, you'd compare hashed passwords
    // This is a simplified check
    return false;
  });
}

// Generate password suggestions
export function generatePasswordSuggestions(): string[] {
  const suggestions = [
    'Use a combination of uppercase and lowercase letters',
    'Include numbers and special characters',
    'Make it at least 12 characters long',
    'Avoid common words or patterns',
    'Consider using a passphrase with multiple words',
    'Don\'t use personal information like names or dates'
  ];
  
  return suggestions;
}


