import { NextFunction, Response, Request } from 'express';
import { CustomRequest } from '../types';
import { FilmCreate, FilmUpdate } from '../types/films';
import filmsService from '../service/films-service';
import { StaffAssign } from '../types/staff';

class FilmsController {
	async create(
		req: CustomRequest<FilmCreate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const userId = req.user.id;
			const { title } = req.body;

			const film = await filmsService.create(req.body, userId);
			res.status(201).json(film);
		} catch (error) {
			next(error);
		}
	}

	async update(
		req: CustomRequest<FilmUpdate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const userId = req.user.id;
			const data = req.body;

			const film = await filmsService.update(userId, filmId, data);
			res.status(201).json(film);
		} catch (error) {
			next(error);
		}
	}

	async delete(
		req: CustomRequest<FilmCreate>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const userId = req.user.id;

			const data = await filmsService.delete(filmId, userId);
			res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async getMany(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user.id;
			const films = await filmsService.getMany(+userId);
			res.status(200).json(films);
		} catch (error) {
			next(error);
		}
	}

	async getOne(
		req: Request<{ id: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = req.params.id;
			const userId = req.user.id;

			const film = await filmsService.getOne(+filmId, userId);
			res.status(200).json(film);
		} catch (error) {
			next(error);
		}
	}

	async getManyPagination(req: Request, res: Response, next: NextFunction) {
		try {
			const page = req.query.page!;
			const pageSize = req.query.pageSize!;

			const films = await filmsService.getManyPagination(
				+page,
				+pageSize
			);
			res.status(200).json(films);
		} catch (error) {
			next(error);
		}
	}

	async getCrewMembers(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const filmsWithCrewMembers = await filmsService.getCrewMembers(filmId)
			res.json(filmsWithCrewMembers)	
		} catch (error) {
			next(error);
		}
	}

	async getActors(req: Request, res: Response, next: NextFunction) {
		try {
			const filmId = +req.params.id;
			const filmsWithActors = await filmsService.getActors(filmId)
			res.json(filmsWithActors)	
		} catch (error) {
			next(error);
		}
	}

	async assignActor(
		req: CustomRequest<StaffAssign>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const actorId = +req.body.staffId;

			const response = await filmsService.assignActor(filmId, actorId);
			res.json(response);
		} catch (error) {
			next(error);
		}
	}

	async assignCrewMember(
		req: CustomRequest<StaffAssign>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const crewMemberId = +req.body.staffId;

			const response = await filmsService.assignCrewMember(
				filmId,
				crewMemberId
			);
			res.json(response);
		} catch (error) {
			next(error);
		}
	}
	async unassignCrewMember(
		req: CustomRequest<StaffAssign>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const crewMemberId = +req.body.staffId;

			const response = await filmsService.unassignCrewMember(
				filmId,
				crewMemberId
			);
			res.json(response);
		} catch (error) {
			next(error);
		}
	}
	async unassignActor(
		req: CustomRequest<StaffAssign>,
		res: Response,
		next: NextFunction
	) {
		try {
			const filmId = +req.params.id;
			const actorId = +req.body.staffId;

			const response = await filmsService.unassignActor(
				filmId,
				actorId
			);
			res.json(response);
		} catch (error) {
			next(error);
		}
	}
}

export default new FilmsController();
