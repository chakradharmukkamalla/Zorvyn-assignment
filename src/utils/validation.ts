import { z } from 'zod';
import { ROLES, RECORD_TYPES } from './constants';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(ROLES).optional(),
});

// User Schemas
export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(ROLES).optional(),
  active: z.boolean().optional(),
});

// Financial Record Schemas
export const createRecordSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(RECORD_TYPES),
  category: z.string().min(1, 'Category is required'),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

export const updateRecordSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(RECORD_TYPES).optional(),
  category: z.string().min(1).optional(),
  date: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const recordFilterSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  category: z.string().optional(),
  type: z.enum(RECORD_TYPES).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  search: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateRecordInput = z.infer<typeof createRecordSchema>;
export type UpdateRecordInput = z.infer<typeof updateRecordSchema>;
export type RecordFilterInput = z.infer<typeof recordFilterSchema>;

export const validateRequest = <T>(schema: z.Schema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
  return { success: false, error: errors };
};

// Validate role against constants
export const validateRole = (role: string): boolean => {
  return ROLES.includes(role as any);
};

// Validate record type against constants
export const validateRecordType = (type: string): boolean => {
  return RECORD_TYPES.includes(type as any);
};
