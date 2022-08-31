import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { UpdateOngPassword } from '../domain/features/UpdateOngPassword';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class UpdateOngPasswordService implements UpdateOngPassword {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({
    id,
    oldPassword,
    password,
  }: UpdateOngPassword.Input): Promise<UpdateOngPassword.Output> {
    let ong = await this.ongsRepository.findById(id);

    if (!ong) throw new AppError('Ong does not exists.');

    const user = ong.getUser();

    if (!user) throw new AppError('User does not exists.');

    const isOldPasswordCorrect = await compare(oldPassword, user.getPassword());

    if (!isOldPasswordCorrect) throw new AppError('Old password incorrect');

    const hashedPassword = await hash(password, 8);

    user.setPassword(hashedPassword);

    ong.setUser(user);

    ong = await this.ongsRepository.save(ong);

    return ong.toDto();
  }
}

export { UpdateOngPasswordService };
