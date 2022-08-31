import {
  Donation,
  DonationProps,
  DonationPartial,
} from '@modules/campaign/domain/models/Donation';
import { IDonationsRepository } from '@modules/campaign/domain/repositories/IDonationsRepository';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Donation as DonationDb } from '../entities/Donation';
import { DonationsMappers } from '../mappers/DonationsMappers';

@EntityRepository(DonationDb)
class DonationsRepository implements IDonationsRepository {
  private readonly ormRepository: Repository<DonationDb>;

  constructor() {
    this.ormRepository = getRepository(DonationDb);
  }

  public async listDonationsByCampaign(
    campaignId: string,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<DonationPartial>> {
    const [donationsData, count] = await this.ormRepository.findAndCount({
      where: {
        campaign: campaignId,
      },
      skip,
      take,
    });

    return {
      numberOfItens: count,
      itens: DonationsMappers.mapMany(donationsData),
    };
  }
  public async findById(id: string): Promise<Donation | undefined> {
    const donationData = await this.ormRepository.findOne({
      where: {
        id: id,
      },
    });

    let donation: Donation | undefined;
    if (donationData) {
      donation = new Donation(donationData as unknown as DonationProps);
    }
    return donation;
  }

  public async save(donationData: Donation): Promise<Donation> {
    const dto = donationData.toDto();
    const donationDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(donationDb);

    return new Donation(donationDb as unknown as DonationProps);
  }

  public async softDelete(data: Donation): Promise<void> {
    const dto = data.toDto();

    const donationDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(donationDb);
  }
}

export { DonationsRepository };
