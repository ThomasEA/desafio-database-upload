import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoriesRoutes from './categories.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/transactions', transactionsRouter);

export default routes;
