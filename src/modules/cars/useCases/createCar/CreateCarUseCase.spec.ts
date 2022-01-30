import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car test',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test5578',
      fine_amount: 50,
      brand: 'Brand car test',
      category_id: '1522',
    });
    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car test 1',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test5578',
      fine_amount: 50,
      brand: 'Brand car test',
      category_id: '1522',
    });
    await expect(
      createCarUseCase.execute({
        name: 'Car test 2',
        description: 'Description car test',
        daily_rate: 100,
        license_plate: 'Test5578',
        fine_amount: 50,
        brand: 'Brand car test',
        category_id: '1522',
      }),
    ).rejects.toEqual(new AppError('Car already exists!'));
  });

  it('Should not be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car test',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test5579',
      fine_amount: 50,
      brand: 'Brand car test',
      category_id: '1522',
    });

    expect(car.available).toBe(true);
  });
});
