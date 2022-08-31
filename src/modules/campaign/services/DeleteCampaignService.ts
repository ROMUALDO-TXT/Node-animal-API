import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DeleteCampaignService {
  constructor(
    @inject('CampaignsRepoitory')
    private campaignsRepository: ICampaignsRepository,
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<void> {
    const campaign = await this.campaignsRepository.findById(id);
    const ong = await this.ongsRepository.findByUserId(userId);

    if (!campaign) throw new AppError('Campaign not found.');

    if (campaign.getOng() === ong) {
      await this.campaignsRepository.softDelete(campaign);
    } else {
      throw new AppError("Your ong can't edit this campaign.");
    }
  }
}

export { DeleteCampaignService };
