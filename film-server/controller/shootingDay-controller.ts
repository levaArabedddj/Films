import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types';
import { ShootingDayCreate, ShootingDayUpdate } from '../types/shootingDay';
import shootingDayService from '../service/shootingDay-service';

class ShootingDayController {
	async create(
		req: CustomRequest<ShootingDayCreate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const creatingData = req.body;
			const filmId = +req.params.id;
			const newFinance = await shootingDayService.create(
				filmId,
				creatingData
			);

			res.status(201).json(newFinance);
		} catch (error) {
			next(error);
		}
	}

	async update(
		req: CustomRequest<ShootingDayUpdate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const dayId = +req.params.dayId;
			const updateData = req.body;

			const updatedShootingDay = await shootingDayService.update(
				filmId,
                dayId,
				updateData
			);
			res.json(updatedShootingDay);
		} catch (error) {
			next(error);
		}
	}


	async getMany(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const finance = await shootingDayService.getMany(filmId);
			res.json(finance);
		} catch (error) {
			next(error);
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const dayId = +req.params.dayId;
            
			const shootingDay = await shootingDayService.getOne(filmId, dayId);
			res.json(shootingDay);
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId  = +req.params.id;
            const dayId = +req.params.dayId; 
			const deleteFinance = await shootingDayService.delete(filmId, dayId);

			res.json(deleteFinance);
		} catch (error) {
			next(error);
		}
	}
}

export default new ShootingDayController();
