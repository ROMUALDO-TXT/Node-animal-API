import { ApproveOngService } from '@modules/ongs/services/ApproveOngService';
import { CreateOngService } from '@modules/ongs/services/CreateOngService';
import { DeleteOngNotificationService } from '@modules/ongs/services/DeleteNotificationService';
import { DeleteOngService } from '@modules/ongs/services/DeleteOngService';
import { ListOngsNotificationService } from '@modules/ongs/services/ListOngNotificationsService';
import { ListOngService } from '@modules/ongs/services/ListOngsService';
import { MarkAsReadService } from '@modules/ongs/services/MarkAsReadService';
import { NotifyOngService } from '@modules/ongs/services/NotifyOngService';
import { AddressDto } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OngsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOngService = container.resolve(ListOngService);

    const ongs = await listOngService.execute();

    return response.json(ongs);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cnpj,
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
    const createOngService = container.resolve(CreateOngService);

    const address: AddressDto = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const ong = await createOngService.execute({
      name,
      cnpj,
      email,
      password,
      phone,
      address,
    });
    return response.json(ong);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;

    const deleteOngService = container.resolve(DeleteOngService);

    await deleteOngService.execute(id, userId);

    return response.status(200);
  }

  public async listNotifications(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ongId = request.user.child_id;

    const listNotifications = container.resolve(ListOngsNotificationService);

    const notifications = await listNotifications.execute(ongId);

    return response.json(notifications);
  }

  public async markAsRead(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { notificationId } = request.body;

    const markAsReadService = container.resolve(MarkAsReadService);
    await markAsReadService.execute(notificationId);

    return response.send();
  }

  public async deleteNotification(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { notificationId } = request.body;
    const ongId = request.user.child_id;

    const deleteNotificationService = container.resolve(
      DeleteOngNotificationService,
    );
    await deleteNotificationService.execute(notificationId, ongId);

    return response.send();
  }

  public async approve(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const approveOngService = container.resolve(ApproveOngService);
    const notifyOngService = container.resolve(NotifyOngService);
    const ong = await approveOngService.execute(id);

    const message = `Sua ong foi aprovada pelos administradores! Agora você tem acesso a todas as funcionalidades do Campanha Animal.`;

    await notifyOngService.execute({ subject: message, ong });

    return response.json(ong);
  }
}
