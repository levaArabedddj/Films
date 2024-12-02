import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";
import filmsService from "../service/films-service";

export default async function authorMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const filmId = +req.params.id
        if(!filmId) return next(ApiError.BadRequest('Need to provide film id'))
    
        const userId = req.user.id
        if (!userId) return next(ApiError.UnauthorizedError());

        const film = await filmsService.getById(filmId)
        if (!film) return next(ApiError.BadRequest('Film not found'))

        if(film.userId !== userId) {
            return next(ApiError.ForbiddenError())
        }

        next()
    } catch (error) {
        return next(ApiError.BadRequest('Some error in authorMiddleware'))
    }
}