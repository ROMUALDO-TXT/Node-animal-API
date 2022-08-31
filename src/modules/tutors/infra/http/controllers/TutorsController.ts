import { CreateTutorService } from '@modules/tutors/services/CreateTutorService';
import { ListTutorService } from '@modules/tutors/services/ListTutorService';
import { AddressDto } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TutorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listTutorService = container.resolve(ListTutorService);

    const tutors = await listTutorService.execute({ skip, take });

    return response.json(tutors);
  }

  //Controller to create a tutor
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
      state,
      city,
      district,
      street,
      complement,
      zipcode,
      number,
    } = request.body;

    const address: AddressDto = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const createTutor = container.resolve(CreateTutorService);
    const tutor = await createTutor.execute({
      name,
      cpf,
      email,
      password,
      phone,
      address,
    });

    return response.json(tutor);
  }
}
