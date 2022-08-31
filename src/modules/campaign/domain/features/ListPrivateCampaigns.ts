import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { CampaignPartial } from '../models/Campaign';

export interface ListPrivateCampaings {
  execute: (
    data: ListPrivateCampaings.Input,
    pagination: Pagination,
  ) => Promise<ListPrivateCampaings.Output>;
}

export namespace ListPrivateCampaings {
  export type Input = {
    ongId: string;
    name?: string;
    isApproved: boolean;
    isActive: boolean;
  };

  export type Output = PaginatedRepositoryResponse<CampaignPartial>;
}
