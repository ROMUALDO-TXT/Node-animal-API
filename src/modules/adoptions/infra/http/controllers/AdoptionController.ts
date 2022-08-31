import { CancelAdoptionService } from '@modules/adoptions/services/CancelAdoptionService';
import { CreateAdoptionService } from '@modules/adoptions/services/CreateAdoptionService';
import { ListOpenAdoptionsService } from '@modules/adoptions/services/ListOpenAdoptionsService';
import { ListRequirementTutorsService } from '@modules/adoptions/services/ListRequirementsTutors';
import { UpdateStatusService } from '@modules/adoptions/services/UpdateStatusService';
import { UpdateAdoptedService } from '@modules/animals/services/UpdateAdoptedService';
// import { NotifyOngService } from '@modules/ongs/services/NotifyOngService';
// import { NotifyTutorService } from '@modules/tutors/services/NotifyTutorService';
import { UpdateTutorRequirementsService } from '@modules/tutors/services/UpdateTutorRequirements';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AdoptionsController {
  //Create Adoption
  public async create(request: Request, response: Response): Promise<Response> {
    const { animalId } = request.body;

    const tutorId = request.user.child_id;

    const createAdoptionService = container.resolve(CreateAdoptionService);
    const updateTutorRequirementsService = container.resolve(
      UpdateTutorRequirementsService,
    );
    // const notifyTutorService = container.resolve(NotifyTutorService);
    // const notifyOngService = container.resolve(NotifyOngService);

    const adoption = await createAdoptionService.execute({
      animalId,
      tutorId,
    });

    await updateTutorRequirementsService.execute({
      operation: 'Plus',
      tutorId: tutorId,
    });
    // await notifyOngService.execute(ongNotification);
    // await notifyTutorService.execute(tutorNotification);

    return response.json(adoption);
  }
  //Set status as "Approved"
  public async approveAdoption(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { adoptionId } = request.body;

    const ongId = request.user.child_id;

    const updateStatusService = container.resolve(UpdateStatusService);
    const updateTutorRequirementsService = container.resolve(
      UpdateTutorRequirementsService,
    );
    const updateAdoptedService = container.resolve(UpdateAdoptedService);
    // const notifyTutorService = container.resolve(NotifyTutorService);

    const adoption = await updateStatusService.execute({
      ongId,
      status: 'Aprovado',
      adoptionId,
    });

    //await notifyTutorService.execute(tutorNotification);

    await updateTutorRequirementsService.execute({
      operation: 'Minus',
      tutorId: adoption.tutor.id,
    });

    await updateAdoptedService.execute({
      animalId: String(adoption.animal.id),
      adopted: true,
    });

    return response.json(adoption);
  }

  //Set status as "Denied"
  public async denyAdoption(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { adoptionId, motif } = request.body;

    const ongId = request.user.child_id;

    const updateStatusService = container.resolve(UpdateStatusService);
    // const notifyTutorService = container.resolve(NotifyTutorService);
    const updateTutorRequirementsService = container.resolve(
      UpdateTutorRequirementsService,
    );

    const adoption = await updateStatusService.execute({
      ongId,
      status: 'Negado',
      adoptionId,
      motif,
    });

    // await notifyTutorService.execute(tutorNotification);

    await updateTutorRequirementsService.execute({
      operation: 'Minus',
      tutorId: adoption.tutor.id,
    });

    return response.json(adoption);
  }

  //Update status to "In Analysis"
  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { adoptionId } = request.body;

    const ongId = request.user.child_id;

    const updateStatusService = container.resolve(UpdateStatusService);
    // const notifyTutorService = container.resolve(NotifyTutorService);

    const adoption = await updateStatusService.execute({
      ongId,
      status: 'Em analise',
      adoptionId,
    });

    //await notifyTutorService.execute(tutorNotification);

    return response.json(adoption);
  }

  //List adoptions that are "Requested" or "In analysis"
  public async listOpenAdoptions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);
    const ongId = request.user.child_id;

    const listOpenAdoptionsService = container.resolve(
      ListOpenAdoptionsService,
    );

    const adoptions = await listOpenAdoptionsService.execute(
      { ongId },
      { skip, take },
    );

    return response.json(adoptions);
  }

  public async listRequirementTutors(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { animalId } = request.params;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);
    const ongId = request.user.child_id;

    const listRequirementTutors = container.resolve(
      ListRequirementTutorsService,
    );

    const adoptions = await listRequirementTutors.execute(
      { ongId, animalId },
      { skip, take },
    );

    return response.json(adoptions);
  }

  //Set status as "Canceled"
  public async cancel(request: Request, response: Response): Promise<Response> {
    const { adoptionId } = request.body;

    const tutorId = request.user.child_id;

    const cancelAdoptionService = container.resolve(CancelAdoptionService);
    const updateTutorRequirementsService = container.resolve(
      UpdateTutorRequirementsService,
    );
    // const notifyTutorService = container.resolve(NotifyTutorService);
    // const notifyOngService = container.resolve(NotifyOngService);

    const adoption = await cancelAdoptionService.execute({
      tutorId,
      adoptionId,
    });

    await updateTutorRequirementsService.execute({
      operation: 'Minus',
      tutorId: tutorId,
    });

    // await notifyOngService.execute({
    //   subject: `${adoption.tutor.user.name} cancelou o requerimento de adoção de ${adoption.animal.name}`,
    //   ong: adoption.animal.ong,
    // });

    // await notifyTutorService.execute({
    //   subject: `Seu pedido de adoção para a ong ${adoption.animal.ong.user.name} foi cancelado.`,
    //   ongPicture: adoption.animal.ong.avatar as string,
    //   tutor: adoption.tutor,
    // });

    return response.json(adoption);
  }
}
