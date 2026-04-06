import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
type AllowedRoles = Role[];
export declare const requireRole: (...allowedRoles: AllowedRoles) => (req: Request, res: Response, next: NextFunction) => void;
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const isAnalystOrAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const isViewerOrAbove: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=rbac.d.ts.map