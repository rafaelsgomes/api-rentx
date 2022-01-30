import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPassswordUserUseCase } from './ResetPassswordUserUseCase';

class ResetPassswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { token } = request.query;

    const resetPassswordUserUseCase = container.resolve(
      ResetPassswordUserUseCase,
    );

    await resetPassswordUserUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPassswordUserController };
