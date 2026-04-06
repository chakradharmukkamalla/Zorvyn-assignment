import { ROLES, RECORD_TYPES } from '../utils/constants';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: typeof ROLES[number];
      };
    }
  }
}

export type UserRole = typeof ROLES[number];
export type RecordType = typeof RECORD_TYPES[number];

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: typeof ROLES[number];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
