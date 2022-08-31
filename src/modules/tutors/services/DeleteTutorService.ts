import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';

@injectable()
class DeleteTutorService {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string, userId: string): Promise<void> {
    const tutor = await this.tutorsRepository.findById(id);
    const user = await this.usersRepository.findById(userId);

    if (!tutor) {
      throw new AppError('Tutor not found.');
    }
    if (tutor.getUser() === user) {
      await this.tutorsRepository.softDelete(tutor);
    } else {
      throw new AppError("You can't edit this tutor.");
    }
  }
}

export { DeleteTutorService };
