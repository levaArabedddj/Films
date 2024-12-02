import axios from 'axios';
import storageService from '../services/storage-service';

export const $api = axios.create({
	baseURL: 'http://localhost:5000/api/',
});

$api.interceptors.request.use(
	(config) => {
		const token = storageService.getToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
