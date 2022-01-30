import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalsUseCase } from './CreateRentalsUseCase';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
describe('Create a rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalsUseCase = new CreateRentalsUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });
  it('Should be able to create a new rental for a available car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'Car test',
      daily_rate: 150,
      license_plate: 'ABC15055',
      fine_amount: 80,
      category_id: 'categoryTest',
      brand: 'Car test',
    });

    const rental = await createRentalsUseCase.execute({
      user_id: '01234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another onpen to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '01234',
      car_id: '159753',
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalsUseCase.execute({
        user_id: '01234',
        car_id: '159758',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError(`There's a rental in progress for user!`));
  });

  it('Should not be able to create a new rental if there is another onpen to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '01234',
      car_id: '159753',
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalsUseCase.execute({
        user_id: '56789',
        car_id: '159753',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable!'));
  });

  it('Should not be able to create a new rental with invalid retur time', async () => {
    await expect(
      createRentalsUseCase.execute({
        user_id: '01234',
        car_id: '159753',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
