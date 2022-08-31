import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Donation, DonationPartial } from '../models/Donation';

export interface IDonationsRepository {
  findById: (id: string) => Promise<Donation | undefined>;
  listDonationsByCampaign: (
    campaignId: string,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<DonationPartial>>;

  save: (doantionData: Donation) => Promise<Donation>;
  softDelete: (donation: Donation) => Promise<void>;
}
