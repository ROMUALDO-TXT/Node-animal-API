import { inject, injectable } from 'tsyringe';
import { CampaignPartial } from '../domain/models/Campaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

@injectable()
class ListOtherCampaignsTypeService {
  constructor(
    @inject('CampaignsRepoitory')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(): Promise<CampaignPartial[]> {
    const campaigns = await this.campaignsRepository.listCampaignsHomepage();

    return campaigns;
  }
}

export { ListOtherCampaignsTypeService };
