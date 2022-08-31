import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Campaign, CampaignPartial } from '../models/Campaign';

export interface ICampaignsRepository {
  findById: (id: string) => Promise<Campaign | undefined>;
  findByIdCampaign: (id: string) => Promise<Campaign | undefined>;
  listApprovedCampaigns: (
    isApproved: boolean,
    data: CampaignFilters.NameFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<CampaignPartial>>;

  listActiveCampaigns: (
    data: CampaignFilters.NameFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<CampaignPartial>>;

  listByOngStatusAndName: (
    data: CampaignFilters.PrivateOngFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<CampaignPartial>>;

  listApprovedCampaignsByOng: (
    ongId: string,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<CampaignPartial>>;

  listOtherCampaigns: (id: string) => Promise<CampaignPartial[]>;

  listCampaignsHomepage: () => Promise<CampaignPartial[]>;

  save: (campaignData: Campaign) => Promise<Campaign>;
  softDelete: (campaignData: Campaign) => Promise<void>;
}

export namespace CampaignFilters {
  export type PrivateOngFilter = {
    ongId: string;
    name?: string;
    isApproved: boolean;
    isActive: boolean;
  };
  export type NameFilter = {
    name?: string;
  };
}
