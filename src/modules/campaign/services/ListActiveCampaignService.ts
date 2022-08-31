import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { CampaignPartial } from '../domain/models/Campaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

interface IRequest {
  name?: string;
}

@injectable()
class ListActiveCampaignService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    { skip, take }: Pagination,
    { name }: IRequest,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    const campaigns = await this.campaignsRepository.listActiveCampaigns(
      { name },
      {
        skip,
        take,
      },
    );

    return campaigns;
  }
}

export { ListActiveCampaignService };
