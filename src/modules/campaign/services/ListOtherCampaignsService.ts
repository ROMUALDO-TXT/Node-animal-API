import { inject, injectable } from 'tsyringe';
import { CampaignPartial } from '../domain/models/Campaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

@injectable()
class ListOtherCampaignsService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(id: string): Promise<CampaignPartial[]> {
    const campaigns = await this.campaignsRepository.listOtherCampaigns(id);

    return campaigns;
  }
}

export { ListOtherCampaignsService };
