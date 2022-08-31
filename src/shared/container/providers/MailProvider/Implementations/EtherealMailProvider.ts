import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import {
  IMailContact,
  IMailProvider,
  IParseMailTemplate,
} from '../IMailProvider';
import HandlebarsMailTemplate from '../HandlebarsMailTemplate';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }
  async sendMail(
    to: IMailContact,
    subject: string,
    templateData: IParseMailTemplate,
    from: IMailContact | undefined,
  ): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
    const html = await mailTemplate.parse(templateData);

    const message = {
      from: {
        name: from?.name || 'Gethash Camapanha animal',
        address: from?.email || 'corbin.hagenes36@ethereal.email',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    };

    this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        // return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

export default EtherealMailProvider;
