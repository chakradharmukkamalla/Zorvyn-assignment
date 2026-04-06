// Role constants for RBAC
export const ROLES = ['ADMIN', 'ANALYST', 'VIEWER'] as const;

export type Role = typeof ROLES[number];

// Financial record type constants
export const RECORD_TYPES = ['INCOME', 'EXPENSE'] as const;

export type RecordType = typeof RECORD_TYPES[number];

// Default values
export const DEFAULT_ROLE: Role = 'VIEWER';
export const DEFAULT_RECORD_TYPE: RecordType = 'INCOME';

// Helper function to validate role
export const isValidRole = (role: string): role is Role => {
  return ROLES.includes(role as Role);
};

// Helper function to validate record type
export const isValidRecordType = (type: string): type is RecordType => {
  return RECORD_TYPES.includes(type as RecordType);
};
