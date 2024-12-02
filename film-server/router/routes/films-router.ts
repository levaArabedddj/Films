import { Router } from 'express';
import filmsController from '../../controller/films-controller';
import filmsValidator from '../../validator/films-validator';
import { validateRequest } from '../../middlewares/validation-middleware';

const filmsRouter: Router = Router();

filmsRouter.post('/:id/assignActor', filmsController.assignActor);
filmsRouter.post('/:id/assignCrewMember', filmsController.assignCrewMember);

filmsRouter.post('/:id/unassignActor', filmsController.unassignActor);
filmsRouter.post('/:id/unassignCrewMember', filmsController.unassignCrewMember);

filmsRouter.get('/:id/getActors', filmsController.getActors);
filmsRouter.get('/:id/getCrewMembers', filmsController.getCrewMembers);


filmsRouter.post(
	'/create',
	filmsValidator.create,
	validateRequest,
	filmsController.create
);

filmsRouter.get(
	'/getOne/:id',
	filmsValidator.getOne,
	validateRequest,
	filmsController.getOne
);

filmsRouter.get('/getMany', filmsController.getMany);

filmsRouter.get(
	'/getManyPagination',
	filmsValidator.getManyPagination,
	validateRequest,
	filmsController.getManyPagination
);

filmsRouter.delete(
	'/delete/:id',
	filmsValidator.getOne,
	validateRequest,
	filmsController.delete
);

filmsRouter.put(
	'/update/:id',
	filmsValidator.update,
	validateRequest,
	filmsController.update
);

export default filmsRouter;
