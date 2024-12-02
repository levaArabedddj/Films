import { Router } from "express";
import scriptController from "../../controller/script-controller";
import authorMiddleware from "../../middlewares/author-middleware";


const scriptRouter = Router()

scriptRouter.get(
    '/getOne/:id',
    authorMiddleware,
    scriptController.getOne
)

scriptRouter.delete(
    '/delete/:id',
    authorMiddleware,
    scriptController.delete
)

scriptRouter.post(
    '/create/:id',
    authorMiddleware,
    scriptController.create
)

export default scriptRouter