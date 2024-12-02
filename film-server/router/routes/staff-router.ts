import { Router } from "express";
import staffController from "../../controller/staff-controller";
import staffValidator from "../../validator/staff-validator";
import { validateRequest } from "../../middlewares/validation-middleware";


const staffRouter = Router()

staffRouter.get(
    '/getAllActors',
    staffController.getAllActors
)

staffRouter.get(
    '/getAllCrewMembers',
    staffController.getAllCrewMembers
)

staffRouter.post(
    '/createCrewMember',
    staffController.createCrewMember,
    validateRequest,
    staffValidator.crewMemberCreate
)

staffRouter.post(
    '/createActor',
    staffValidator.actorCreate,
    validateRequest,
    staffController.createActor
)

staffRouter.delete(
    '/deleteActor/:id',
    staffValidator.staffDelete,
    validateRequest,
    staffController.deleteActor
)

staffRouter.delete(
    '/deleteCrewMember/:id',
    staffValidator.staffDelete,
    validateRequest,
    staffController.deleteCrewMember
)


export default staffRouter
