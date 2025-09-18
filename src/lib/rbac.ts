import { type UserRole } from '@/models/User';

export function userHasRole(userRoles: UserRole[], required: UserRole | UserRole[]): boolean {
  const requiredList = Array.isArray(required) ? required : [required];
  return requiredList.some((r) => userRoles.includes(r));
}

// Alias for consistency with existing codebase
export function checkRole(userRoles: UserRole[], required: UserRole | UserRole[]): boolean {
  return userHasRole(userRoles, required);
}

// Check if user has admin privileges
export function isAdmin(userRoles: UserRole[]): boolean {
  return userRoles.includes('admin');
}

// Check if user has company-related roles
export function isCompanyUser(userRoles: UserRole[]): boolean {
  return userRoles.some(role => 
    ['company_org_admin', 'company_hiring_manager', 'company_finance'].includes(role)
  );
}

// Check if user has freelancer role
export function isFreelancer(userRoles: UserRole[]): boolean {
  return userRoles.includes('freelancer');
}

// Check if user has support roles
export function isSupportUser(userRoles: UserRole[]): boolean {
  return userRoles.some(role => 
    ['admin', 'compliance_officer', 'support_agent', 'field_master'].includes(role)
  );
}

// Check if user can manage other users
export function canManageUsers(userRoles: UserRole[]): boolean {
  return userRoles.some(role => 
    ['admin', 'compliance_officer'].includes(role)
  );
}

// Check if user can access company data
export function canAccessCompany(userRoles: UserRole[], companyId?: string): boolean {
  if (isAdmin(userRoles)) return true;
  if (isCompanyUser(userRoles)) return true;
  return false;
}

// Check if user can create tasks
export function canCreateTasks(userRoles: UserRole[]): boolean {
  return userRoles.some(role => 
    ['admin', 'company_org_admin', 'company_hiring_manager'].includes(role)
  );
}

// Check if user can view all tasks
export function canViewAllTasks(userRoles: UserRole[]): boolean {
  return userRoles.some(role => 
    ['admin', 'compliance_officer', 'support_agent'].includes(role)
  );
}

// Get user's permission level (0-5, higher = more permissions)
export function getPermissionLevel(userRoles: UserRole[]): number {
  if (userRoles.includes('admin')) return 5;
  if (userRoles.includes('compliance_officer')) return 4;
  if (userRoles.includes('field_master')) return 3;
  if (userRoles.includes('support_agent')) return 2;
  if (isCompanyUser(userRoles)) return 1;
  if (userRoles.includes('freelancer')) return 0;
  return 0;
}


