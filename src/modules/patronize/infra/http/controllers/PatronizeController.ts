import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { NotifyOngService } from '@modules/ongs/services/NotifyOngService';
// import { NotifyTutorService } from '@modules/tutors/services/NotifyTutorService';
import { CreatePatronizeService } from '@modules/patronize/services/CreatePatronageService';
import { CreateSignatureService } from '@modules/patronize/services/CreateSignatureService';
import { DeleteRequirementService } from '@modules/patronize/services/DeleteRequirementService';
import { ListPatronsOngService } from '@modules/patronize/services/ListPatronsOngService';

export default class PatronizeController {
  public async createRequest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { description, planName, planAmount, planId, animalId } =
      request.body;
    const tutorId = request.user.child_id;

    const createPatronizeService = container.resolve(CreatePatronizeService);

    const patronize = await createPatronizeService.execute({
      description,
      planName,
      planAmount,
      planId,
      animalId,
      tutorId,
    });

    return response.json(patronize);
  }
  public async confirmPatronize(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      id,
      patronizeId,
      status,
      createdOn,
      startsOn,
      nextBillingDate,
      dueDay,
      accessLink,
    } = request.body;
    const tutorId = request.user.child_id;

    const createSignatureService = container.resolve(CreateSignatureService);
    // const notifyOngService = container.resolve(NotifyOngService);
    // const notifyTutorService = container.resolve(NotifyTutorService);

    const patronize = await createSignatureService.execute({
      tutorId,
      id,
      patronizeId,
      status,
      createdOn,
      startsOn,
      nextBillingDate,
      dueDay,
      accessLink,
    });

    // notifyOngService.execute(ongNotification);
    // notifyTutorService.execute(tutorNotification);

    return response.json(patronize);
  }

  public async deleteRequirement(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;
    const tutorId = request.user.child_id;

    const deleteRequirementService = container.resolve(
      DeleteRequirementService,
    );

    await deleteRequirementService.execute({ tutorId, patronizeId: id });

    return response.status(200).send();
  }
  public async listPatronsOng(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ongId = request.user.child_id;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPatronsOngService = container.resolve(ListPatronsOngService);

    const patrons = await listPatronsOngService.execute(
      { ongId },
      { skip, take },
    );

    return response.json(patrons);
  }
}
