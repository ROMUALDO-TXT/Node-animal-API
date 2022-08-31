import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found.', 404);

    if (user.getRole() === 'Admin')
      throw new AppError('Cannot delete the system admin');

    await this.usersRepository.softDelete(user);
  }
}

export { DeleteUserService };
