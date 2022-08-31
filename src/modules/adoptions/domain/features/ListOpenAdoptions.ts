import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { AdoptionPartial } from '../models/Adoption';

export interface ListOpenAdoptions {
  execute: (
    data: ListOpenAdoptions.Input,
    pagination: Pagination,
  ) => Promise<ListOpenAdoptions.Output>;
}

export namespace ListOpenAdoptions {
  export type Input = {
    ongId: string;
  };

  export type Output = PaginatedRepositoryResponse<AdoptionPartial>;
}
