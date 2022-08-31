import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { AnimalPartial } from '../models/Animal';

export interface ListPrivateAnimals {
  execute: (
    data: ListPrivateAnimals.Input,
    pagination: Pagination,
  ) => Promise<ListPrivateAnimals.Output>;
}

export namespace ListPrivateAnimals {
  export type Input = {
    type?: string;
    ongId: string;
    isAvailable: boolean;
    name?: string;
  };

  export type Output = PaginatedRepositoryResponse<AnimalPartial>;
}
