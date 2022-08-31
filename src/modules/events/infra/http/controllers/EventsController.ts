import { ApproveEventService } from '@modules/events/services/ApproveEventService';
import { CreateEventService } from '@modules/events/services/CreateEventService';
import { DeleteEventService } from '@modules/events/services/DeleteEventService';
import { ListEventAdminService } from '@modules/events/services/ListEventAdminService';
import { ListEventOngService } from '@modules/events/services/ListEventOngService';
import { ListEventService } from '@modules/events/services/ListEventService';
import { ShowEventService } from '@modules/events/services/ShowEventService';
import { UpdateEventService } from '@modules/events/services/UpdateEventService';
import { NotifyOngService } from '@modules/ongs/services/NotifyOngService';
import { AddressProps } from '@modules/users/domain/models';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const name = request.query.name;
    const isActive = Boolean(request.query.isActive);
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    const listEventService = container.resolve(ListEventAdminService);

    const events = await listEventService.execute(
      {
        name: name ? String(name) : undefined,
        isActive,
      },
      {
        skip,
        take,
      },
    );

    return response.json(events);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      type,
      description,
      date,
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    } = request.body;
    const ongId = request.user.child_id;
    const pictureFilename = request.file?.filename;

    const addressData: AddressProps = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const createEventService = container.resolve(CreateEventService);

    const event = await createEventService.execute({
      name,
      description,
      date,
      email,
      phone,
      type,
      pictureFilename,
      ongId,
      addressData,
    });

    return response.json(event);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      date,
      email,
      phone,
      type,
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
      eventId,
    } = request.body;
    const pictureFilename = request.file?.filename;

    const addressData: AddressProps = {
      state,
      city,
      district,
      street,
      number,
      complement,
      zipcode,
    };

    const updateEventService = container.resolve(UpdateEventService);

    const event = await updateEventService.execute({
      name,
      description,
      date,
      email,
      phone,
      type,
      pictureFilename,
      eventId,
      addressData,
    });

    return response.json(event);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { eventId } = request.body;

    const showEventService = container.resolve(ShowEventService);

    const event = await showEventService.execute({ id: eventId });

    return response.json(event);
  }

  public async listActiveEvents(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { state, name, type, period } = request.query;
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    let _type: string[] = [];
    let _state: string[] = [];

    if (type) {
      _type = String(type).split(',');
    }
    if (state) {
      _state = String(state).split(',');
    }

    const listFilterEvents = container.resolve(ListEventService);
    const events = await listFilterEvents.execute(
      {
        state: _state,
        name: name ? String(name) : undefined,
        period: period ? String(period) : undefined,
        type: _type,
      },
      {
        skip,
        take,
      },
    );

    return response.json({ events });
  }

  public async listOngEvents(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const name = request.query.name;
    const isActive = Boolean(request.query.isActive);
    const ongId = request.user.child_id;
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    const listEventOngService = container.resolve(ListEventOngService);

    const events = await listEventOngService.execute(
      {
        ongId,
        name: name ? String(name) : undefined,
        isActive,
      },
      {
        skip,
        take,
      },
    );

    return response.json(events);
  }

  public async approve(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;
    const approveEventService = container.resolve(ApproveEventService);
    const notifyOngService = container.resolve(NotifyOngService);
    const event = await approveEventService.execute({ id });

    const message = `O evento ${event.getName()} foi aprovado pelos administradores.`;

    await notifyOngService.execute({ subject: message, ong: event.getOng() });

    return response.json(event);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const ongId = request.user.child_id;

    const deleteEventService = container.resolve(DeleteEventService);

    await deleteEventService.execute({ id, ongId });

    return response.status(200).send('Deletion completed!');
  }
}
