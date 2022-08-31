import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AdminContactService } from '../../../services/AdminContactService';

export default class ContactController {
  public async adminContact(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, name, phone, description } = request.body;

    const adminContact = container.resolve(AdminContactService);

    await adminContact.execute({ email, name, phone, description });

    return response.status(204).json();
  }
}
