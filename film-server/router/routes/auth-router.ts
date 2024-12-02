import { Router } from 'express';
import authMiddleware from '../../middlewares/auth-middleware';
import { validateRequest } from '../../middlewares/validation-middleware';
import authController from '../../controller/auth-controller';
import authValidator from '../../validator/auth-validator';

const authRouter: Router = Router();

authRouter.post(
	'/registration',
	authValidator.registration,
	validateRequest,
	authController.registration
);

authRouter.post(
	'/login',
	authValidator.login,
	validateRequest,
	authController.login
);

authRouter.get(
	'/protected',
	authMiddleware,
	authController.protected
)


export default authRouter;
