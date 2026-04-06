import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import {
  successResponse,
  notFoundResponse,
  badRequestResponse,
  createdResponse,
} from '../utils/response';
import {
  validateRequest,
  updateUserSchema,
} from '../utils/validation';

export const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const { page, limit, search } = req.query;
      const result = await userService.getAll({
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
      });
      return successResponse(res, result);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      if (!user) {
        return notFoundResponse(res, 'User not found');
      }
      return successResponse(res, user);
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async update(req: Request, res: Response) {
    const validation = validateRequest(updateUserSchema, req.body);
    if (!validation.success) {
      return badRequestResponse(res, validation.error);
    }

    try {
      const { id } = req.params;
      const user = await userService.update(id, validation.data);
      if (!user) {
        return notFoundResponse(res, 'User not found');
      }
      return successResponse(res, user, 'User updated successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async deactivate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.deactivate(id);
      if (!user) {
        return notFoundResponse(res, 'User not found');
      }
      return successResponse(res, user, 'User deactivated successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async activate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.activate(id);
      if (!user) {
        return notFoundResponse(res, 'User not found');
      }
      return successResponse(res, user, 'User activated successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.delete(id);
      return successResponse(res, null, 'User deleted successfully');
    } catch (error: any) {
      return badRequestResponse(res, error.message);
    }
  },
};
