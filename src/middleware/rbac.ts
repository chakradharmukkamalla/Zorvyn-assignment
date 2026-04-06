import { Request, Response, NextFunction } from 'express';
import { ROLES } from '../utils/constants';
import { forbiddenResponse } from '../utils/response';

type AllowedRoles = string[];

export const requireRole = (...allowedRoles: AllowedRoles) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return forbiddenResponse(res, 'Authentication required');
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return forbiddenResponse(res, 'Insufficient permissions');
    }

    next();
  };
};

export const isAdmin = requireRole('ADMIN');
export const isAnalystOrAdmin = requireRole('ANALYST', 'ADMIN');
export const isViewerOrAbove = requireRole(...ROLES);
