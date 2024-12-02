import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types';
import { FinanceCreate, FinanceUpdate } from '../types/finance';
import financeService from '../service/finance-service';

class FinanceController {
	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const finance = await financeService.getOne(filmId);
            res.json(finance)
		} catch (error) {
			next(error);
		}
	}

	async create(
		req: CustomRequest<FinanceCreate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const creatingData = req.body;
			const filmId = +req.params.id;
			const newFinance = await financeService.create(
				filmId,
				creatingData
			);

			res.status(201).json(newFinance);
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const deleteFinance = await financeService.delete(filmId);

			res.json(deleteFinance);
		} catch (error) {
			next(error);
		}
	}

	async update(
		req: CustomRequest<FinanceUpdate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const updateData = req.body;

			const updatedFinance = await financeService.update(
				filmId,
				updateData
			);
            res.json(updatedFinance)
		} catch (error) {
			next(error);
		}
	}
}

export default new FinanceController();
