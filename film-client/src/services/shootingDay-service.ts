import { $api } from '../api';
import { ShootingDayCreate } from '../types/response/films';

class ShootingDayService {
	async delete( filmId: number, dayId: number) {
		const response = await $api.delete(`shootingDay/delete/${filmId}/${dayId}`);
		console.log('shooting day response', response);
	}
	async create(data: ShootingDayCreate, filmId: number) {
		const response = await $api.post(`shootingDay/create/${filmId}`, data);
		console.log('shooting day response', response);
	}
}

export default new ShootingDayService();
