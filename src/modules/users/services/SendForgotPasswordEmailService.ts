import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { randomUUID } from 'crypto';
import {
  IUsersRepository,
  IUserTokensRepository,
} from '../domain/repositories';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const now = new Date();
    const expiresIn = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 3,
      now.getMinutes(),
    );
    const token = await this.userTokensRepository.generate({
      token: randomUUID(),
      userId: user.id,
      expiresIn,
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    const to = {
      name: user.getName(),
      email: user.getEmail(),
    };
    const subject = 'Campanha Animal - Recuperação de Senha';
    const receiverName = 'Campanha Animal';
    const templateData = {
      file: forgotPasswordTemplate,
      variables: {
        senderName: user.getName(),
        receiverName: receiverName,
        link: `${process.env.APP_WEB_URL}/users/reset_password?token=${token}`,
      },
    };

    await this.mailProvider.sendMail(to, subject, templateData, undefined);
  }
}

export { SendForgotPasswordEmailService };
