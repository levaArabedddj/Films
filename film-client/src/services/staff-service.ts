import { AxiosResponse } from 'axios';
import {
	Actor,
	ActorCreate,
	CrewMember,
	CrewMemberCreate,
} from '../types/response/films';
import { $api } from '../api';

class StaffService {
	async unassignCrewMember(crewId: number, filmId: number)	{
		const response = await $api.post(`films/${filmId}/unassignCrewMember`, {
			"staffId": crewId
		})
		return response.data
	}
	async unassignActor(actorId: number, filmId: number)	{
		const response = await $api.post(`films/${filmId}/unassignActor`, {
			"staffId": actorId
		})
		return response.data
	}

	async assignActor(actorId: number, filmId: number)	{
		const response = await $api.post(`films/${filmId}/assignActor`, {
			"staffId": actorId
		})
		return response.data
	}

	async assignCrew(crewId: number, filmId: number)	{
		const response = await $api.post(`films/${filmId}/assignCrewMember`, {
			"staffId": crewId
		})
		return response.data
	}


	async createCrewMember(data: CrewMemberCreate): Promise<CrewMember[]> {
		const response: AxiosResponse<CrewMember[]> = await $api.post(
			'staff/createCrewMember',
			data
		);
		return response.data;
	}
	async createActor(data: ActorCreate): Promise<Actor> {
		const response: AxiosResponse<Actor> = await $api.post(
			'staff/createActor',
			data
		);
		return response.data;
	}
	async getActors(): Promise<Actor[]> {
		const response: AxiosResponse<Actor[]> =
			await $api.get('staff/getAllActors');
		return response.data;
	}
	async getCrewMembers(): Promise<CrewMember[]> {
		const response: AxiosResponse<CrewMember[]> = await $api.get(
			'staff/getAllCrewMembers'
		);
		return response.data;
	}

	async deleteCrewMember(id: number) {
		const response: AxiosResponse<CrewMember> = await $api.delete(
			`staff/deleteCrewMember/${id}`
		);
		console.log(response);
	}
	async deleteActor(id: number) {
		const response: AxiosResponse<Actor> = await $api.delete(
			`staff/deleteActor/${id}`
		);
		console.log(response);
	}
}

export default new StaffService();
