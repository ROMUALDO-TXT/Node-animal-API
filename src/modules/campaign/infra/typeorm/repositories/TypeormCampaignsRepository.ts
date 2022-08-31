import {
  Campaign,
  CampaignPartial,
  CampaignProps,
} from '@modules/campaign/domain/models/Campaign';
import {
  CampaignFilters,
  ICampaignsRepository,
} from '@modules/campaign/domain/repositories/ICampaignsRepository';
import { CampaignsMappers } from '../mappers/CampaignsMappers';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import {
  EntityRepository,
  getRepository,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { Campaign as CampaignDb } from '../entities/Campaign';

@EntityRepository(CampaignDb)
class CampaignsRepository implements ICampaignsRepository {
  private readonly ormRepository: Repository<CampaignDb>;

  constructor() {
    this.ormRepository = getRepository(CampaignDb);
  }

  public async findById(id: string): Promise<Campaign | undefined> {
    const campaignData = await this.ormRepository.findOne({
      join: {
        alias: 'campaign',
        leftJoinAndSelect: {
          ong: 'campaign.ong',
        },
      },
      where: {
        id: id,
      },
    });
    let campaign: Campaign | undefined;
    if (campaignData) {
      campaign = new Campaign(campaignData as unknown as CampaignProps);
    }

    return campaign;
  }

  public async findByIdCampaign(id: string): Promise<Campaign | undefined> {
    const campaignData = await this.ormRepository.findOne({
      join: {
        alias: 'campaign',
        leftJoinAndSelect: {
          ong: 'campaign.ong',
        },
      },
      where: {
        idCampaign: id,
      },
    });
    let campaign: Campaign | undefined;
    if (campaignData) {
      campaign = new Campaign(campaignData as unknown as CampaignProps);
    }

    return campaign;
  }

  public async listByOngStatusAndName(
    { ongId, name, isApproved, isActive }: CampaignFilters.PrivateOngFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    let campaignsData: CampaignDb[] = [];
    let count: number;

    if (name === undefined) {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          isActive: isActive,
          isApproved: isApproved,
          ong: {
            id: ongId,
          },
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          name: Like(name),
          isActive: isActive,
          isApproved: isApproved,
          ong: {
            id: ongId,
          },
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: CampaignsMappers.mapMany(campaignsData),
    };
  }

  public async listActiveCampaigns(
    { name }: CampaignFilters.NameFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    let campaignsData: CampaignDb[] = [];
    let count: number;

    if (name === undefined) {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          isActive: true,
          isApproved: true,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          name: Like(name),
          isActive: true,
          isApproved: true,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: CampaignsMappers.mapMany(campaignsData),
    };
  }

  public async listApprovedCampaigns(
    isApproved: boolean,
    { name }: CampaignFilters.NameFilter,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    let campaignsData: CampaignDb[] = [];
    let count: number;

    if (name === undefined) {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          isApproved,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [campaignsData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'campaign',
          leftJoinAndSelect: {
            ong: 'campaign.ong',
          },
        },
        where: {
          name: Like(name),
          isApproved,
        },
        order: {
          id: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: CampaignsMappers.mapMany(campaignsData),
    };
  }

  public async listApprovedCampaignsByOng(
    ongId: string,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<CampaignPartial>> {
    const [campaignsData, count] = await this.ormRepository.findAndCount({
      join: {
        alias: 'campaign',
        leftJoinAndSelect: {
          ong: 'campaign.ong',
        },
      },
      where: {
        id: ongId,
        isActive: true,
        isApproved: true,
      },
      order: {
        id: 'ASC',
      },
      skip,
      take,
    });

    return {
      numberOfItens: count,
      itens: CampaignsMappers.mapMany(campaignsData),
    };
  }

  public async listOtherCampaigns(id: string): Promise<CampaignPartial[]> {
    const campaignsData = await this.ormRepository.find({
      join: {
        alias: 'campaign',
        leftJoinAndSelect: {
          ong: 'campaign.ong',
        },
      },
      where: {
        id: Not(id),
      },
      order: {
        createdAt: 'DESC',
      },
      take: 9,
    });

    return CampaignsMappers.mapMany(campaignsData);
  }

  public async listCampaignsHomepage(): Promise<CampaignPartial[]> {
    const campaignsData = await this.ormRepository.find({
      order: {
        createdAt: 'ASC',
      },
      take: 9,
    });

    return CampaignsMappers.mapMany(campaignsData);
  }

  public async save(campaignData: Campaign): Promise<Campaign> {
    const dto = campaignData.toDto();
    const campaignDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });
    await this.ormRepository.save(campaignDb);

    return new Campaign(campaignDb as unknown as CampaignProps);
  }

  public async softDelete(data: Campaign): Promise<void> {
    const dto = data.toDto();

    const campaignDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(campaignDb);
  }
}

export { CampaignsRepository };
