import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { AnimalPartial } from '../models/Animal';

export interface ListFilterAnimal {
  execute: (
    data: ListFilterAnimal.Input,
    pagination: Pagination,
  ) => Promise<ListFilterAnimal.Output>;
}

export namespace ListFilterAnimal {
  export type Input = {
    species: string[];
    name?: string | undefined;
    sex: string[];
    city?: string | undefined;
    size: string[];
    type: string;
    minAge: number;
    maxAge: number;
  };

  export type Output = PaginatedRepositoryResponse<AnimalPartial>;
}
