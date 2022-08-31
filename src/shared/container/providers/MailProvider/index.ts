import { container } from 'tsyringe';
import { IMailProvider } from './IMailProvider';
import EtherealMailProvider from './Implementations/EtherealMailProvider';

const mailProvider = {
  ethereal: new EtherealMailProvider(),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider.ethereal,
);
