import { NextFunction, Request, Response } from "express";
import staffService from "../service/staff-service";
import { CustomRequest } from "../types";
import { ActorCreate, CrewMemberCreate } from "../types/staff";

class StaffController {
    async getAllActors(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const actors = await staffService.getAllActors()
            res.json(actors) 
        } catch (error) {
            next(error) 
        }
    }

    async getAllCrewMembers(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const actors = await staffService.getAllCrewMembers()
            res.json(actors) 
        } catch (error) {
            next(error) 
        }
    }

    async createActor(
        req: CustomRequest<ActorCreate>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const creatingData = req.body
            const createdActor = await staffService.createActor(creatingData)
            res.status(201).json(createdActor)
        } catch (error) {
            next(error) 
        }
    }
    
    async createCrewMember(
        req: CustomRequest<CrewMemberCreate>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const creatingData = req.body
            const createdCrewMember = await staffService.createCrewMember(creatingData)
            console.log(createdCrewMember);
            
            res.status(201).json(createdCrewMember)
        } catch (error) {
            next(error) 
        }
    }
    
    async deleteActor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const actorId = +req.params.id
            const deletedActor = await staffService.deleteActor(actorId)
            res.json(deletedActor)
        } catch (error) {
            next(error) 
        }
    }

    async deleteCrewMember(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const actorId = +req.params.id
            const deletedCrewMember = await staffService.deleteCrewMember(actorId)
            res.json(deletedCrewMember)
        } catch (error) {
            next(error) 
        }
    }
}

export default new StaffController ()