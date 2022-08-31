import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class DeleteOngService {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string, userId: string): Promise<void> {
    const ong = await this.ongsRepository.findByIdRelated(id);
    const user = await this.usersRepository.findById(userId);

    if (!ong || !user) {
      throw new AppError('Ong not found.');
    }

    if (ong.getUser() === user) {
      await this.ongsRepository.softDelete(ong);
    } else {
      throw new AppError("You can't edit this ong.");
    }
  }
}

export { DeleteOngService };
