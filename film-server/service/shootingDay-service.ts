import { ApiError } from '../exceptions/api-error';
import prisma from '../prisma/prismaClient';
import { ShootingDayCreate, ShootingDayUpdate } from '../types/shootingDay';

class ShootingDayService {

	async getMany(filmId: number) {
		try {
			const shootingDay = await prisma.shootingDay.findMany({
				where: { filmId },
			});
			if (!shootingDay.length) throw ApiError.BadRequest( 'Shooting day for this film does not exist');
			return shootingDay;
		} catch (error) {
			throw error;
		}
	}

	async getOne(filmId: number, dayId: number) {
		try {
			const shootingDay = await prisma.shootingDay.findFirst({
				where: { filmId, id: dayId  },
			});
			if (!shootingDay) throw ApiError.BadRequest( 'Shooting day for this film does not exist');
			return shootingDay;
		} catch (error) {
			throw error;
		}
	}
	async update(filmId: number, dayId: number, updateData: ShootingDayUpdate) {
		try {
			const shootingDay = await prisma.shootingDay.findFirst({
				where: { filmId, id: dayId },
			});
			if (!shootingDay) throw ApiError.BadRequest( 'Shooting day does not exist for this film');

			const updatedShootingDay = await prisma.shootingDay.update({
				where: {
					id: shootingDay.id,
				},
				data: { ...updateData },
			});
			return updatedShootingDay;
		} catch (error) {
			throw error;
		}
	}

	async delete(filmId: number, dayId: number) {
		try {
			const shootingDay = await prisma.shootingDay.findFirst({
				where: { filmId, id: dayId },
			});
			if (!shootingDay || !shootingDay.filmId)
				throw ApiError.BadRequest(
					'Shooting does not exist for this film'
				);
			return prisma.shootingDay.delete({
				where: {
					id: shootingDay.id,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async create(filmId: number, creatingData: ShootingDayCreate) {
		try {
			const shootingDay = await prisma.shootingDay.findFirst({
				where: { filmId, shooting_day: creatingData.shooting_day },
			});
			if (shootingDay)
				throw ApiError.BadRequest(
					'Shooting day for this day already exist'
            );
			const newShootingDay = await prisma.shootingDay.create({
				data: {
					...creatingData,
					filmId,
				},
			});
			return newShootingDay;
		} catch (error) {
			throw error;
		}
	}

}

export default new ShootingDayService();
