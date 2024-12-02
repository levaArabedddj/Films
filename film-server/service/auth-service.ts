import { User } from '@prisma/client';
import { ApiError } from '../exceptions/api-error';
import { UserLogin, UserRegister } from '../types/auth';
import tokenService from './token-service';
import userService from './user-service';
import bcrypt from 'bcrypt';

class AuthService {
    private buildResponse(user: User) {
			const token = tokenService.generate({
				id: user.id,
				email: user.email,
			});
			return {
				user: {
                    id: user.id,
					name: user.name,
					surname: user.surname,
					email: user.email,
				},
                token
			};
    }

	async login(loginData: UserLogin) {
		try {
            const user = await userService.getByEmail(loginData.email)
            if (!user) throw ApiError.BadRequest('User does not exist')

            const isPasswordMatch = await bcrypt.compare(loginData.password, user.password)
            if(!isPasswordMatch) throw ApiError.BadRequest('Password incorrect')

            return this.buildResponse(user)
		} catch (error) {
			throw error;
		}
	}

	async registration(registerData: UserRegister) {
		try {
            const existingUser = await userService.getByEmail(registerData.email)
            if(existingUser) throw ApiError.BadRequest('Email is already in use')
            
			const hashedPassword = await bcrypt.hash(registerData.password, 10);
			const user = await userService.create({...registerData, password: hashedPassword});
            return this.buildResponse(user)
		} catch (error) {
			throw error;
		}
	}
}

export default new AuthService();
