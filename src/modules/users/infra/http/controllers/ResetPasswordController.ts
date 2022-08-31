import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordService } from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, password_confirmation } = request.body;

    const token = request.query.token as string;

    const resetPassword = container.resolve(ResetPasswordService);

    const user = await resetPassword.execute({
      token,
      password,
      password_confirmation,
    });
    return response.json(user);
  }
}
