import { Router } from 'express';
import authRouter from './auth.routes.js';
import membershipRouter from './membership.routes.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import databaseMiddleware from '../middlewares/database.middleware.js';

const router = Router();

router.use(databaseMiddleware);
router.use('/auth', authRouter);
router.use('/memberships', authMiddleware, membershipRouter);

export default router;
