import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { PatronizePartial } from '../models/Patronize';

export interface ListPatronsOng {
  execute: (
    data: ListPatronsOng.Input,
    pagination: Pagination,
  ) => Promise<ListPatronsOng.Output>;
}

export namespace ListPatronsOng {
  export type Input = {
    ongId: string;
  };

  export type Output = PaginatedRepositoryResponse<PatronizePartial>;
}
