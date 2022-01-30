import { Router } from 'express';

import { CreateRentalsController } from '@modules/rentals/useCases/createRentals/CreateRentalsController';
import { DevolutionRentalsController } from '@modules/rentals/useCases/devolutionRentals/DevolutionRentalsController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalsController = new DevolutionRentalsController();
const listRentalsByUserController = new ListRentalsByUserController();
rentalsRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalsController.handle,
);

rentalsRoutes.get('/', ensureAuthenticated, listRentalsByUserController.handle);

export { rentalsRoutes };
