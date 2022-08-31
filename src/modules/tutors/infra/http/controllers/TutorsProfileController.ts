import { CreateCardService } from '@modules/tutors/services/CreateCardService';
import { ListTutorsCardsService } from '@modules/tutors/services/ListTutorsCardsService';
import { ListTutorsNotificationsService } from '@modules/tutors/services/ListTutorsNotificationsService';
import { ShowTutorService } from '@modules/tutors/services/ShowTutorService';
import { UpdateTutorBannerService } from '@modules/tutors/services/UpdateTutorBannerService';
import { UpdateTutorPasswordService } from '@modules/tutors/services/UpdateTutorPasswordService';
import { UpdateTutorService } from '@modules/tutors/services/UpdateTutorService';
import { AddressDto } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TutorsProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      picture,
      description,
      state,
      city,
      district,
      street,
      complement,
      zipcode,
      number,
    } = request.body;

    const tutorId = request.user.child_id;

    const updateTutor = container.resolve(UpdateTutorService);

    const address: AddressDto = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const tutor = await updateTutor.execute({
      name,
      cpf,
      email,
      phone,
      tutorId,
      description,
      avatar: request.file?.filename || picture,
      address,
    });

    return response.json(tutor);
  }

  public async showOthersProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const showTutorService = container.resolve(ShowTutorService);

    const tutor = await showTutorService.execute({ id });

    return response.json(tutor);
  }

  public async showMyProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.user.child_id;

    const showTutorService = container.resolve(ShowTutorService);

    const tutor = await showTutorService.execute({ id });

    return response.json(tutor);
  }

  public async listNotifications(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const tutorId = request.user.child_id;

    const listNotifications = container.resolve(ListTutorsNotificationsService);

    const notifications = await listNotifications.execute(tutorId);

    return response.json(notifications);
  }

  public async updateBanner(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateBanner = container.resolve(UpdateTutorBannerService);

    const tutor = await updateBanner.execute({
      tutorId: request.user.child_id,
      banner: request.file?.filename,
    });

    return response.json(tutor);
  }

  public async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { oldPassword, password } = request.body;

    const id = request.user.child_id;

    const resetPassword = container.resolve(UpdateTutorPasswordService);

    await resetPassword.execute({
      id,
      oldPassword,
      password,
    });
    return response.status(200).send('Password updated correctly');
  }

  public async createCard(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      creditCardId,
      last4CardNumber,
      expirationMonth,
      expirationYear,
      brand,
    } = request.body;
    const tutorId = request.user.child_id;

    const createCardService = container.resolve(CreateCardService);

    const creditCard = await createCardService.execute({
      tutorId,
      name,
      creditCardId,
      last4CardNumber,
      expirationMonth,
      expirationYear,
      brand,
    });

    return response.json(creditCard);
  }
  public async listTutorsCards(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const tutorId = request.user.child_id;

    const listCards = container.resolve(ListTutorsCardsService);

    const notifications = await listCards.execute(tutorId);

    return response.json(notifications);
  }
}
