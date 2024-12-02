import { Router } from 'express';
import authRouter from './routes/auth-router';
import filmsRouter from './routes/films-router';
import authMiddleware from '../middlewares/auth-middleware';
import scriptRouter from './routes/script-router';
import financeRouter from './routes/finance-router';
import shootingDay from './routes/shootingDay-router';
import staffRouter from './routes/staff-router';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/films',
	authMiddleware,  
	filmsRouter
);
router.use('/filmScript',  authMiddleware, scriptRouter)
router.use('/finance', authMiddleware, financeRouter)
router.use('/shootingDay', authMiddleware, shootingDay)
router.use('/staff', authMiddleware, staffRouter)

router.use('/healthcheck', (req, res) => {
	res.send('Its working');
});
export default router;
