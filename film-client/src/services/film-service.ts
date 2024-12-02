import { AxiosResponse } from 'axios';
import { $api } from '../api';
import { Film, FullFilmResponse } from '../types/response/films';

class FilmService {
	constructor() {}
	async getMany(): Promise<Film[]> {
		const response: AxiosResponse<Film[]> = await $api.get('films/getMany');
		return response.data;
	}
	async getOneWithDetails(id: number): Promise<FullFilmResponse> {
		const response: AxiosResponse<FullFilmResponse> = await $api.get(
			`films/getOne/${id}`
		);
		return response.data;
	}

	async delete(id: number) {
		const response: AxiosResponse<FullFilmResponse> = await $api.delete(
			`films/delete/${id}`
		);
		return response.data;
	}

	async create({
		title,
		description,
		genre,
	}: {
		title: string;
		description: string;
		genre: string;
	}): Promise<Film> {
		const response: AxiosResponse<Film> = await $api.post('films/create', {
			title,
			description,
			genre,
		});
		return response.data;
	}
}

export default new FilmService();
