import { AddressProps } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateVolunteerService } from '../../../services/CreateVolunteerService';
import { ListVolunteersService } from '../../../services/ListVolunteersService';

export default class UsersController {
  public async createVolunteer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      email,
      phone,
      sendViaEmail,
      state,
      city,
      district,
      street,
      complement,
      zipcode,
      number,
    } = request.body;

    const createVolunteer = container.resolve(CreateVolunteerService);

    const address: AddressProps = {
      state,
      city,
      district,
      street,
      complement,
      zipcode,
      number,
    };

    const user = await createVolunteer.execute({
      name,
      email,
      phone,
      sendViaEmail,
      addressData: address,
    });
    return response.status(201).json({ user });
  }
  public async listVolunteers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    const listVolunteersService = container.resolve(ListVolunteersService);

    const volunteers = await listVolunteersService.execute({
      pagination: { skip, take },
    });

    return response.json({ volunteers });
  }
}
