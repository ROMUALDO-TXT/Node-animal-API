import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { CampaignPartial } from '../domain/models/Campaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

interface IRequest {
  ongId: string;
}

//For Ong profile page
@injectable()
class ListPublicOngCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    { ongId }: IRequest,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    const campaigns = await this.campaignsRepository.listApprovedCampaignsByOng(
      ongId,
      {
        skip,
        take,
      },
    );

    return campaigns;
  }
}

export { ListPublicOngCampaignsService };
