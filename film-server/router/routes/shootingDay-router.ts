import { Router } from "express";
import authorMiddleware from "../../middlewares/author-middleware";
import shootingDayController from "../../controller/shootingDay-controller";

const shootingDayRouter = Router()

shootingDayRouter.get(
    '/getMany/:id', 
    authorMiddleware, 
    shootingDayController.getMany
);

shootingDayRouter.get(
    '/getOne/:id/:dayId', 
    authorMiddleware, 
    shootingDayController.getOne
);

shootingDayRouter.post(
    '/create/:id', 
    authorMiddleware, 
    // shootingDayValidator.create,
    // validateRequest,
    shootingDayController.create
);


shootingDayRouter.delete(
    '/delete/:id/:dayId', 
    authorMiddleware, 
    shootingDayController.delete
);

shootingDayRouter.put(
    '/update/:id/:dayId', 
    authorMiddleware, 
    // shootingDayValidator.update,
    // validateRequest,
    shootingDayController.update
);


export default shootingDayRouter