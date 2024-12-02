import { $api } from '../api';
import { ScriptCreate} from '../types/response/films';

class ScriptService {
	async create(data: ScriptCreate, filmId: number) {
		const response = await $api.post(`filmScript/create/${filmId}`, data);
		console.log('script create response', response);
	}
    async delete(filmId: number) {
        const response = await $api.delete(`filmScript/delete/${filmId}`)
		console.log('script create response', response);
    }
}

export default new ScriptService();
