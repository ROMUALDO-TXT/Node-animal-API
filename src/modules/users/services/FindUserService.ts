import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UserDto } from '../domain/models/User';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId: id }: IRequest): Promise<UserDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found.');

    return user.toDto();
  }
}

export { ShowUserService };
