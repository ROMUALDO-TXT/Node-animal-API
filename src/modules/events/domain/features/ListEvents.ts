import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { EventPartial } from '../models/Event';

export interface ListEvents {
  execute: (
    data: ListEvents.Input,
    pagination: Pagination,
  ) => Promise<ListEvents.Output>;
}

export namespace ListEvents {
  export type Input = {
    name?: string;
    period?: string;
    type: string[];
    state: string[];
  };
  export type Output = PaginatedRepositoryResponse<EventPartial>;
}
