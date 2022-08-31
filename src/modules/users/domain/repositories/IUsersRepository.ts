import { User } from '@modules/users/domain/models/User';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';

export interface IUsersRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByName: (name: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  listEditors: (
    data: UsersRepositoryDTO.List,
  ) => Promise<PaginatedRepositoryResponse<User>>;
  save: (userData: User) => Promise<User>;
  softDelete: (userData: User) => Promise<void>;
}

export namespace UsersRepositoryDTO {
  export type List = {
    pagination: Pagination;
  };
}
