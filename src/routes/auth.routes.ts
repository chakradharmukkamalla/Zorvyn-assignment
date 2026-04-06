import { Router, Request, Response } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', (req: Request, res: Response) => authController.register(req, res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));
router.get('/profile', authenticate, (req: Request, res: Response) => authController.getProfile(req, res));

export default router;