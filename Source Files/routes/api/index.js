import { Router } from 'express';
import userRouter from './users';
import animalRouter from './animals';

const router = Router();

router.use('/users', userRouter);
router.use('/animals', animalRouter);

export default router;

