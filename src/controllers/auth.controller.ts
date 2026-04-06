import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import {
  successResponse,
  createdResponse,
  badRequestResponse,
} from '../utils/response';
import {
  validateRequest,
  loginSchema,
  registerSchema,
} from '../utils/validation';

export const authController = {
  async register(req: Request, res: Response) {
    const validation = validateRequest(registerSchema, req.body);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const { email, password, name, role } = validation.data;
      const user = await authService.register(email, password, name, role);
      return createdResponse(res, user, 'User registered successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async login(req: Request, res: Response) {
    const validation = validateRequest(loginSchema, req.body);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const { email, password } = validation.data;
      const result = await authService.login(email, password);
      return successResponse(res, result, 'Login successful');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const user = await authService.getProfile(req.user!.id);
      if (!user) {
        return badRequestResponse(res, 'User not found');
      }
      return successResponse(res, user);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },
};