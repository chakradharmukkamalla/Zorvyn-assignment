import { Router, Request, Response } from 'express';
import { recordController } from '../controllers/record.controller';
import { authenticate } from '../middleware/auth';
import { isAdmin, isAnalystOrAdmin, isViewerOrAbove } from '../middleware/rbac';

const router = Router();

// Dashboard APIs - Viewer and above can access
router.use(authenticate);
router.use(isViewerOrAbove);

// Dashboard summary endpoints
router.get('/summary', (req: Request, res: Response) => recordController.getSummary(req, res));
router.get('/category-totals', (req: Request, res: Response) => recordController.getCategoryTotals(req, res));
router.get('/recent', (req: Request, res: Response) => recordController.getRecentTransactions(req, res));
router.get('/monthly', (req: Request, res: Response) => recordController.getMonthlySummary(req, res));

// Record CRUD - Analyst and Admin can read, Admin can write
router.get('/', isAnalystOrAdmin, (req: Request, res: Response) => recordController.getAll(req, res));
router.get('/:id', isAnalystOrAdmin, (req: Request, res: Response) => recordController.getById(req, res));

// Admin only - Create, Update, Delete
router.post('/', isAdmin, (req: Request, res: Response) => recordController.create(req, res));
router.put('/:id', isAdmin, (req: Request, res: Response) => recordController.update(req, res));
router.delete('/:id', isAdmin, (req: Request, res: Response) => recordController.delete(req, res));

export default router;