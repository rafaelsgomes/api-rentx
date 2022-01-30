import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalsUseCase } from './DevolutionRentalsUseCase';

class DevolutionRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const devolutionRentalsUseCase = container.resolve(
      DevolutionRentalsUseCase,
    );

    const rental = await devolutionRentalsUseCase.execute({
      id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalsController };
