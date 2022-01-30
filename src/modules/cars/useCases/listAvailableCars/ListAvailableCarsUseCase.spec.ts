import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test1234',
      fine_amount: 50,
      brand: 'Brand car test',
      category_id: '123456',
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 2',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test1234',
      fine_amount: 50,
      brand: 'Brand car test 2',
      category_id: '123456',
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand car test 2',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 2',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test1234',
      fine_amount: 50,
      brand: 'Brand car test 2',
      category_id: '123456',
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car test 2',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test 2',
      description: 'Description car test',
      daily_rate: 100,
      license_plate: 'Test1234',
      fine_amount: 50,
      brand: 'Brand car test 2',
      category_id: '123456',
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: '123456',
    });

    expect(cars).toEqual([car]);
  });
});
