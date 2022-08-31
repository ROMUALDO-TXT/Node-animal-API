import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { User } from '../models/User';

export interface ListUsers {
  execute: (data: ListUsers.Input) => Promise<ListUsers.Output>;
}

export namespace ListUsers {
  export type Input = {
    pagination: Pagination;
  };

  export type Output = PaginatedRepositoryResponse<User>;
}
