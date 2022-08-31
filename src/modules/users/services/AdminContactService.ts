import path from 'path';
import { inject, injectable } from 'tsyringe';
import {
  IMailContact,
  IMailProvider,
} from '@shared/container/providers/MailProvider/IMailProvider';
import { AdminContact } from '../domain/features/AdminContact';

@injectable()
class AdminContactService implements AdminContact {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    email,
    name,
    phone,
    description,
  }: AdminContact.Input): Promise<void> {
    const contactTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'contact.hbs',
    );
    const from = {
      email: email,
      name: name,
    } as IMailContact;

    const to = {
      name: 'Campanha Animal',
      email: 'corbin.hagenes36@ethereal.email',
    } as IMailContact;

    const subject = `Contato Campanha Animal por ${name}`;

    const templateData = {
      file: contactTemplate,
      variables: {
        senderName: name,
        senderPhone: phone,
        senderEmail: email,
        description: description,
        receiverName: to.name,
      },
    };

    await this.mailProvider.sendMail(to, subject, templateData, from);
  }
}

export { AdminContactService };
