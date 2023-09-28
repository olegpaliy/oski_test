import { Router } from 'express';
import { userController } from '../controllers/user';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.put('/signout', authMiddleware, userController.signOut);
userRouter.get('/profile', authMiddleware, userController.profile);

export default userRouter;
