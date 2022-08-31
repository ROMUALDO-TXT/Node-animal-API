import { ActivateCampaignService } from '@modules/campaign/services/ActivateCampaignService';
import { ApproveCampaignService } from '@modules/campaign/services/ApproveCampaign';
import { CreateCampaignService } from '@modules/campaign/services/CreateCampaignService';
import { CreateDonationService } from '@modules/campaign/services/CreateDonationService';
import { DeleteCampaignService } from '@modules/campaign/services/DeleteCampaignService';
import { ListActiveCampaignService } from '@modules/campaign/services/ListActiveCampaignService';
import { ListCampaignService } from '@modules/campaign/services/ListCampaignService';
import { ListDonationsService } from '@modules/campaign/services/ListDonationsService';
import { ListOtherCampaignsService } from '@modules/campaign/services/ListOtherCampaignsService';
import { ListPrivateOngCampaignsService } from '@modules/campaign/services/ListPrivateOngCampaignsService';
import { ListPublicOngCampaignsService } from '@modules/campaign/services/ListPublicOngCampaignsService';
import { ShowCampaignService } from '@modules/campaign/services/ShowCampaignService';
import { UpdateCampaignService } from '@modules/campaign/services/UpdateCampaignService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CampaignsController {
  //ADM
  public async index(request: Request, response: Response): Promise<Response> {
    const name = request.query.name;
    const isApproved = request.query.isApproved;
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    const listCampaignService = container.resolve(ListCampaignService);

    const campaigns = await listCampaignService.execute(
      {
        name: name ? String(name) : undefined,
        isApproved: Boolean(isApproved),
      },
      {
        skip,
        take,
      },
    );

    return response.json(campaigns);
  }

  //Geral
  public async listActiveCampaigns(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const name = request.query.name;
    const take = Number(request.query.take);
    const skip = Number(request.query.skip);

    const listActiveCampaignService = container.resolve(
      ListActiveCampaignService,
    );

    const campaigns = await listActiveCampaignService.execute(
      {
        skip,
        take,
      },
      {
        name: name ? String(name) : undefined,
      },
    );

    return response.json(campaigns);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, amountExpected, amountCollected, accountId } =
      request.body;
    const ongId = request.user.child_id;
    const pictureFilename = request.file?.filename;
    const createCampaignService = container.resolve(CreateCampaignService);

    // const notifyOngService = new NotifyOngService();

    const campaign = await createCampaignService.execute({
      name,
      description,
      amountExpected,
      amountCollected,
      pictureFilename,
      ongId,
      accountId,
    });

    // await notifyOngService.execute(ongNotification);

    return response.json(campaign);
  }

  //Update
  public async update(request: Request, response: Response): Promise<Response> {
    const { id, idCampaign, name, description, amountExpected } = request.body;
    const ongId = request.user.child_id;
    const pictureFilename = request.file?.filename;
    const updateCampaignService = container.resolve(UpdateCampaignService);
    //const notifyOngService = new NotifyOngService();

    const campaign = await updateCampaignService.execute({
      id,
      idCampaign,
      name,
      description,
      amountExpected,
      pictureFilename,
      isActive: false,
      isApproved: false,
      ongId,
    });

    //await notifyOngService.execute(ongNotification);

    return response.json(campaign);
  }

  //show
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCampaignService = container.resolve(ShowCampaignService);

    const campaign = await showCampaignService.execute({ id });

    return response.json(campaign);
  }

  public async updateActiveStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { campaignId, isActive } = request.body;
    const ongId = request.user.child_id;

    const activateCampaignService = container.resolve(ActivateCampaignService);

    await activateCampaignService.execute({
      ongId,
      campaignId,
      isActive,
    });
    return response.status(200).send();
  }

  public async updateApprovalStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, isApproved } = request.body;

    const approveCampaignService = container.resolve(ApproveCampaignService);

    await approveCampaignService.execute({
      id,
      isApproved,
    });
    return response.status(200).send();
  }

  //list more
  public async listMore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const listOtherCampaignsService = container.resolve(
      ListOtherCampaignsService,
    );

    const campaigns = await listOtherCampaignsService.execute(id);

    return response.json(campaigns);
  }

  //ong profile
  public async listPublicOngCampaigns(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { ongId } = request.query;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPublicOngCampaignsService = container.resolve(
      ListPublicOngCampaignsService,
    );

    const animals = await listPublicOngCampaignsService.execute(
      {
        ongId: String(ongId),
      },
      {
        skip,
        take,
      },
    );
    return response.json(animals);
  }

  //ongDashboard
  public async listPrivateOngCampaigns(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, ongId, isApproved, isActive } = request.query;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listPrivateOngCampaignsService = container.resolve(
      ListPrivateOngCampaignsService,
    );

    const animals = await listPrivateOngCampaignsService.execute(
      {
        name: String(name),
        ongId: String(ongId),
        isApproved: Boolean(isApproved),
        isActive: Boolean(isActive),
      },
      {
        skip,
        take,
      },
    );
    return response.json(animals);
  }

  public async listDonations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ongId = request.user.child_id;
    const { campaignId } = request.query;
    const skip = Number(request.query.skip);
    const take = Number(request.query.take);

    const listDonationsService = container.resolve(ListDonationsService);

    const donations = await listDonationsService.execute(
      {
        ongId,
        campaignId: String(campaignId),
      },
      {
        skip,
        take,
      },
    );
    return response.json(donations);
  }

  //delete
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;

    const deleteCampaignService = container.resolve(DeleteCampaignService);

    await deleteCampaignService.execute({ id, userId });

    return response.status(200);
  }

  public async createDonate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { status, amount, campaignId } = request.body;
    const tutorId = request.user.child_id;

    const createDonationService = container.resolve(CreateDonationService);
    // const notifyOngService = new NotifyOngService();

    const donate = await createDonationService.execute({
      status,
      amount,
      tutorId,
      campaignId,
    });

    // await notifyOngService.execute(ongNotification);

    return response.json(donate);
  }
}
