import { NextFunction, Request, Response } from "express";
import scriptService from "../service/script-service";

class ScriptController {
    async getOne(
		req: Request,
		res: Response,
		next: NextFunction
    ) {
        try {
            const filmId = +req.params.id
            const script = await scriptService.getOne(filmId)
            res.json(script)
        } catch (error) {
           next(error) 
        }
    }


    async create(
		req: Request,
		res: Response,
		next: NextFunction
    ) {
        try {
            const filmId = +req.params.id
            const scriptData = req.body 
            const script = await scriptService.create(filmId, scriptData)
            res.json(script)
        } catch (error) {
           next(error) 
        }
    }

    async delete(
		req: Request,
		res: Response,
		next: NextFunction
    ) {
        try {
            const filmId = +req.params.id
            const script = await scriptService.delete(filmId)
            res.json(script)
        } catch (error) {
           next(error) 
        }
    }

}

export default new ScriptController()