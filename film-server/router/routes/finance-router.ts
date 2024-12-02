import { Router } from 'express';
import financeController from '../../controller/finance-controller';
import authorMiddleware from '../../middlewares/author-middleware';
import { validateRequest } from '../../middlewares/validation-middleware';
import financeValidator from '../../validator/finance-validator';

const financeRouter = Router();

financeRouter.get(
    '/getOne/:id', 
    authorMiddleware, 
    financeController.getOne
);

financeRouter.post(
    '/create/:id', 
    authorMiddleware, 
    financeValidator.create,
    validateRequest,
    financeController.create
);


financeRouter.delete(
    '/delete/:id', 
    authorMiddleware, 
    financeController.delete
);

financeRouter.put(
    '/update/:id', 
    authorMiddleware, 
    financeValidator.update,
    validateRequest,
    financeController.update
);



export default financeRouter;
