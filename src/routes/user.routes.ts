import { Router, Request, Response } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/rbac';

const router = Router();

router.use(authenticate);
router.use(isAdmin);

router.get('/', (req: Request, res: Response) => userController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => userController.getById(req, res));
router.put('/:id', (req: Request, res: Response) => userController.update(req, res));
router.post('/:id/deactivate', (req: Request, res: Response) => userController.deactivate(req, res));
router.post('/:id/activate', (req: Request, res: Response) => userController.activate(req, res));
router.delete('/:id', (req: Request, res: Response) => userController.delete(req, res));

export default router;