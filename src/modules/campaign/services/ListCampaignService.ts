import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { CampaignPartial } from '../domain/models/Campaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

interface IRequest {
  isApproved: boolean;
  name?: string;
}

@injectable()
class ListCampaignService {
  constructor(
    @inject('CampaignsRepoitory')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    { isApproved, name }: IRequest,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    const campaigns = await this.campaignsRepository.listApprovedCampaigns(
      isApproved,
      {
        name,
      },
      {
        skip,
        take,
      },
    );

    return campaigns;
  }
}

export { ListCampaignService };
