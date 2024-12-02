import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types/response/auth';
import { $api } from '../api';
import storageService from './storage-service';

class AuthService {
	async login(email: string, password: string) {
		try {
			const response: AxiosResponse<AuthResponse> = await $api.post(
				'auth/login',
				{
					email: email,
					password: password,
				}
			);
			storageService.setToken(response.data.token);
			return true;
		} catch (error) {
			console.log('error', error);
			return false;
		}
	}

	async register(
		name: string,
		surname: string,
		email: string,
		password: string
	) {
		try {
			const response: AxiosResponse<AuthResponse> = await $api.post(
				'auth/registration',
				{
					name: name,
					surname: surname,
					email: email,
					password: password,
				}
			);
			storageService.setToken(response.data.token);
			return true;
		} catch (error) {
			console.log('error', error);
			return false;
		}
	}
}

export default new AuthService();
