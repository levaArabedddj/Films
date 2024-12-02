import { ApiError } from '../exceptions/api-error';
import prisma from '../prisma/prismaClient';
import { FinanceCreate, FinanceUpdate } from '../types/finance';
class FinanceService {
	async update(filmId: number, updateData: FinanceUpdate) {
		try {
			const financeExist = await prisma.finance.findFirst({
				where: { filmId },
			});
			if (!financeExist)
				throw ApiError.BadRequest(
					'Finance does not exist for this film'
				);
			const updatedFinance = await prisma.finance.update({
				where: {
					id: financeExist.id,
				},
				data: { ...updateData },
			});
			return updatedFinance;
		} catch (error) {
			throw error;
		}
	}
	async create(filmId: number, data: FinanceCreate) {
		try {
			const financeExist = await prisma.finance.findFirst({
				where: { filmId },
			});
			if (financeExist) throw ApiError.BadRequest( 'Finance already exist for this film');
			const newFinance = await prisma.finance.create({
				data: {
					...data,
					filmId,
				},
			});
			await prisma.film.update({
				where: {id: filmId},
				data: {financeId: newFinance.id}
			})
			return newFinance;
		} catch (error) {
			throw error;
		}
	}

	async getOne(filmId: number) {
		try {
			const finance = await prisma.finance.findFirst({
				where: { filmId },
			});
			if (!finance)
				throw ApiError.BadRequest(
					'Finance does not exist for this film'
				);
			return finance;
		} catch (error) {
			throw error;
		}
	}

	async delete(filmId: number) {
		try {
			const finance = await prisma.finance.findFirst({
				where: { filmId },
			});
			if (!finance || !finance.filmId)
				throw ApiError.BadRequest(
					'Finance does not exist for this film'
				);
			return prisma.finance.delete({where: {
                id: finance.id
            }});
		} catch (error) {
			throw error;
		}
	}
}

export default new FinanceService();
