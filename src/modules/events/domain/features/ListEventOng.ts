import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { EventPartial } from '../models/Event';

export interface ListEventsOng {
  execute: (
    data: ListEventsOng.Input,
    pagination: Pagination,
  ) => Promise<ListEventsOng.Output>;
}

export namespace ListEventsOng {
  export type Input = {
    ongId: string;
    name?: string | undefined;
    isActive: boolean;
  };

  export type Output = PaginatedRepositoryResponse<EventPartial>;
}
