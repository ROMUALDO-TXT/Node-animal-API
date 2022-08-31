import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { UpdateTutorPassword } from '../domain/features/UpdateTutorPassword';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';

@injectable()
class UpdateTutorPasswordService implements UpdateTutorPassword {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    id,
    oldPassword,
    password,
  }: UpdateTutorPassword.Input): Promise<UpdateTutorPassword.Output> {
    let tutor = await this.tutorsRepository.findById(id);

    if (!tutor) throw new AppError('Tutor does not exists.');

    const user = tutor.getUser();

    if (!user) throw new AppError('User does not exists.');

    const currentPassword = user.getPassword();

    const isOldPasswordCorrect = await compare(oldPassword, currentPassword);

    if (!isOldPasswordCorrect) {
      throw new AppError('Old password incorrect');
    }

    const hashedPassword = await hash(password, 8);

    user.setPassword(hashedPassword);

    tutor.setUser(user.toDto());

    tutor = await this.tutorsRepository.save(tutor);

    return tutor.toPartial();
  }
}

export { UpdateTutorPasswordService };
