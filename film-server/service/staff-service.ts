import { ApiError } from '../exceptions/api-error';
import prisma from '../prisma/prismaClient';
import { ActorCreate, CrewMemberCreate } from '../types/staff';

class StaffService {
	async createActor(creatingData: ActorCreate) {
		try {
            const existActor = await prisma.actor.findFirst({ where: { full_name: creatingData.full_name } })
            if(existActor) throw ApiError.BadRequest('Actor is already exist') 

			const createdActor = await prisma.actor.create({
				data: creatingData,
			});

			return createdActor;
		} catch (error) {
			throw error;
		}
	}

	async createCrewMember(creatingData: CrewMemberCreate) {
		try {
            const existActor = await prisma.crewMember.findFirst({ where: { full_name: creatingData.full_name } })
            if(existActor) throw ApiError.BadRequest('Crew member is already exist') 

			const createdCrewMember = await prisma.crewMember.create({
				data: creatingData,
			});

			return createdCrewMember;
		} catch (error) {
			throw error;
		}
	}

	async getAllCrewMembers() {
		try {
			const crewMembers = await prisma.crewMember.findMany();
			return crewMembers;
		} catch (error) {
			throw error;
		}
	}

	async getAllActors() {
		try {
			const actors = await prisma.actor.findMany();
			return actors;
		} catch (error) {
			throw error;
		}
	}

	async deleteActor(id: number) {
		try {
			const deletedActor = await prisma.actor.delete({
				where: { id },
			});
			return deletedActor;
		} catch (error) {
			throw ApiError.BadRequest('some error while deleting staff');
		}
	}

	async deleteCrewMember(id: number) {
		try {
			const deletedCrewMember = await prisma.crewMember.delete({
				where: { id },
			});
			return deletedCrewMember;
		} catch (error) {
			throw ApiError.BadRequest('some error while deleting staff');
		}
	}
}

export default new StaffService();