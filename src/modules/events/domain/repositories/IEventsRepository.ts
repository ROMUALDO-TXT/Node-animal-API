import { Event, EventPartial } from '@modules/events/domain/models/Event';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';

export interface IEventsRepository {
  findById: (id: string) => Promise<Event | undefined>;

  listAllFilter: (
    data: FilterEventsDTO.List,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<EventPartial>>;

  listEventsOngFilter: (
    ongId: string,
    data: FilterEventsDTO.ListActive,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<EventPartial>>;

  listEventsAdminFilter: (
    data: FilterEventsDTO.ListActive,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<EventPartial>>;

  save: (userData: Event) => Promise<Event>;
  softDelete: (userData: Event) => Promise<void>;
}

export namespace FilterEventsDTO {
  export type List = {
    name?: string;
    period?: string;
    type: string[];
    state: string[];
  };
  export type ListActive = {
    isActive: boolean;
    name?: string;
  };
}
