import AppError from '@shared/errors/AppError';
import path from 'path';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { User } from '../domain/models/User';
import { IUsersRepository } from '../domain/repositories';
import { AuthRoles } from '@config/roles';
import { CreateVolunteer } from '../domain/features/CreateVolunteer';

@injectable()
class CreateVolunteerService implements CreateVolunteer {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    phone,
    sendViaEmail,
    addressData,
  }: CreateVolunteer.Input): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email already exists');

    const tmpPassword = `${Math.floor(Math.random() * 900000 + 100000)}`;

    const hashedPassword = await hash(tmpPassword, 8);

    const role: AuthRoles = 'Editor';

    let user = new User(
      {
        name,
        phone,
        role,
        email,
        password: hashedPassword,
      },
      addressData,
    );

    user = await this.usersRepository.save(user);

    if (sendViaEmail) {
      const forgotPasswordTemplate = path.resolve(
        __dirname,
        '..',
        'views',
        'password_via_email.hbs',
      );
      const to = {
        name: user.getName(),
        email: user.getEmail(),
      };
      const subject = 'Campanha Animal - Novo voluntário';
      const receiverName = user.getName();
      const templateData = {
        file: forgotPasswordTemplate,
        variables: {
          senderName: 'Campanha Animal',
          receiverName: receiverName,
          email,
          password: tmpPassword,
        },
      };

      await this.mailProvider.sendMail(to, subject, templateData, undefined);
    }
    user.toDto();

    return user;
  }
}

export { CreateVolunteerService };
