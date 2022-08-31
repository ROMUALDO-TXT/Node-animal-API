import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';
import { IDonationsRepository } from '../domain/repositories/IDonationsRepository';
import { DonationPartial } from '../domain/models/Donation';

interface IRequest {
  ongId: string;
  campaignId: string;
}

@injectable()
class ListDonationsService {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) {}

  public async execute(
    { campaignId, ongId }: IRequest,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<DonationPartial>> {
    const campaignExists = await this.campaignsRepository.findById(campaignId);
    if (!campaignExists || campaignExists.getOng().toDto().id !== ongId)
      throw new AppError('Invalid Campaign');

    const donations = await this.donationsRepository.listDonationsByCampaign(
      campaignId,
      {
        skip,
        take,
      },
    );

    return donations;
  }
}

export { ListDonationsService };
