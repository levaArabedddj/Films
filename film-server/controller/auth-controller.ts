import { NextFunction, Response, Request } from 'express';
import { UserLogin, UserRegister } from '../types/auth';
import { CustomRequest } from '../types';
import authService from '../service/auth-service';

class AuthController {

	async protected(
		req: Request,
		res: Response,
    ) {
        res.send('You reached protected route')
	}

	async registration(
		req: CustomRequest<UserRegister>,
		res: Response,
		next: NextFunction
	) {
		try {
			const registerData = req.body;
			const userData = await authService.registration(registerData);
			res.status(201).json(userData);
		} catch (error) {
			next(error);
		}
	}

	async login(
		req: CustomRequest<UserLogin>,
		res: Response,
		next: NextFunction
	) {
		try {
            const loginData = req.body
            const userData = await authService.login(loginData)
            res.status(200).json(userData)
		} catch (error) {
			next(error);
		}
	}

}

export default new AuthController();
