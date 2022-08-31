import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListUsers } from '../domain/features/ListUsers';
import { User } from '../domain/models';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListVolunteersService implements ListUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    pagination: ListUsers.Input,
  ): Promise<PaginatedRepositoryResponse<User>> {
    return await this.usersRepository.listEditors(pagination);
  }
}

export { ListVolunteersService };
