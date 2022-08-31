import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ShowCampaign } from '../domain/features/ShowCampaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

@injectable()
class ShowCampaignService implements ShowCampaign {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    id,
  }: ShowCampaign.Input): Promise<ShowCampaign.Output> {
    const campaign = await this.campaignsRepository.findByIdCampaign(id);

    if (!campaign) throw new AppError('Campaign not found.');

    const campaignDto = campaign.toDto();
    return {
      id: campaignDto.id,
      idCampaign: campaignDto.idCampaign,
      name: campaignDto.name,
      description: campaignDto.description,
      picture: campaignDto.picture,
      amountCollected: campaignDto.amountCollected,
      amountExpected: campaignDto.amountExpected,
      ongId: campaignDto.ong.id,
      accountId: campaignDto.account.id,
      ongName: campaignDto.ong.user.name,
      ongAvatar: campaignDto.ong.avatar,
    };
  }
}

export { ShowCampaignService };
