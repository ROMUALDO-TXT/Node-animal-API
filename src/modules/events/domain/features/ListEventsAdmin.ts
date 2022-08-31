import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { EventPartial } from '../models/Event';

export interface ListEventsAdmin {
  execute: (
    data: ListEventsAdmin.Input,
    pagination: Pagination,
  ) => Promise<ListEventsAdmin.Output>;
}

export namespace ListEventsAdmin {
  export type Input = {
    name?: string | undefined;
    isActive: boolean;
  };

  export type Output = PaginatedRepositoryResponse<EventPartial>;
}
