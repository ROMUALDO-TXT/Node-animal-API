import AppError from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { ResetPassword } from '../domain/features/ResetPassword';
import {
  IUsersRepository,
  IUserTokensRepository,
} from '../domain/repositories';

@injectable()
class ResetPasswordService implements ResetPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({
    token,
    password,
    password_confirmation,
  }: ResetPassword.Input): Promise<ResetPassword.Output> {
    if (password.length < 6)
      throw new AppError('Senha deve conter no mínimo 6 dígitos');

    if (password != password_confirmation)
      throw new AppError('Passwords must match');

    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('User Token does not exists.');

    const user = await this.usersRepository.findById(userToken.getUserId());

    if (!user) throw new AppError('User does not exists.');

    const now = Number(new Date());
    const expiration = Number(userToken.getExpiration());

    if (now > expiration) throw new AppError('Token expired.');

    user.setPassword(await hash(password, 8));

    await this.usersRepository.save(user);

    await this.userTokensRepository.expireToken(userToken.getToken());
  }
}

export { ResetPasswordService };
