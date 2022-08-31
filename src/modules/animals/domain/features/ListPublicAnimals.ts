import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { AnimalPartial } from '../models/Animal';

export interface ListPublicAnimals {
  execute: (
    data: ListPublicAnimals.Input,
    pagination: Pagination,
  ) => Promise<ListPublicAnimals.Output>;
}

export namespace ListPublicAnimals {
  export type Input = {
    id?: string;
    type: string;
    ongId: string;
  };

  export type Output = PaginatedRepositoryResponse<AnimalPartial>;
}
