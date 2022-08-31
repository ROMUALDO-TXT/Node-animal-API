import { Pagination } from '@shared/domain/dtos/Pagination';
import { injectable, inject } from 'tsyringe';
import { ListPrivateCampaings } from '../domain/features/ListPrivateCampaigns';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

//For Ong profile page
@injectable()
class ListPrivateOngCampaignsService implements ListPrivateCampaings {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    { ongId, name, isApproved, isActive }: ListPrivateCampaings.Input,
    { skip, take }: Pagination,
  ): Promise<ListPrivateCampaings.Output> {
    const campaigns = await this.campaignsRepository.listByOngStatusAndName(
      {
        ongId,
        name,
        isApproved,
        isActive,
      },
      {
        skip,
        take,
      },
    );

    return campaigns;
  }
}

export { ListPrivateOngCampaignsService };
