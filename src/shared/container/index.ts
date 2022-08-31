import './providers';
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/TypeormUsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/TypeormUserTokensRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { OngsRepository } from '@modules/ongs/infra/typeorm/repositories/TypeormOngsRepository';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { IBankAccountsRepository } from '@modules/ongs/domain/repositories/IBankAccountsRepository';
import { BankAccountsRepository } from '@modules/ongs/infra/typeorm/repositories/TypeormBankAccountsRepository';
import { OngsNotificationsRepository } from '@modules/ongs/infra/typeorm/repositories/TypeormOngsNotificationsRepository';
import { IOngsNotificationsRepository } from '@modules/ongs/domain/repositories/IOngsNotificationsRepository';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import { ITutorsNotificationsRepository } from '@modules/tutors/domain/repositories/ITutorsNotificationsRepository';
import { TutorsRepository } from '@modules/tutors/infra/typeorm/repositories/TypeormTutorsRepository';
import { TutorsNotificationsRepository } from '@modules/tutors/infra/typeorm/repositories/TypeormTutorsNotificationsRepository';
import { CreditCardsRepository } from '@modules/tutors/infra/typeorm/repositories/TypeormCreditCardsRepository';
import { ICreditCardsRepository } from '@modules/tutors/domain/repositories/ICreditCardRepository';
import { IEventsRepository } from '@modules/events/domain/repositories/IEventsRepository';
import { EventsRepository } from '@modules/events/infra/typeorm/repositories/TypeormEventsRepository';
import { ICampaignsRepository } from '@modules/campaign/domain/repositories/ICampaignsRepository';
import { CampaignsRepository } from '@modules/campaign/infra/typeorm/repositories/TypeormCampaignsRepository';
import { IDonationsRepository } from '@modules/campaign/domain/repositories/IDonationsRepository';
import { DonationsRepository } from '@modules/campaign/infra/typeorm/repositories/TypeormDonationsRepository';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { AnimalsRepository } from '@modules/animals/infra/typeorm/repositories/TypeormAnimalsRepository';
import { AnimalPicturesRepository } from '@modules/animals/infra/typeorm/repositories/TypeormAnimalPicturesRepository';
import { IAnimalPicturesRepository } from '@modules/animals/domain/repositories/IAnimalPicturesRepository';
import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';
import { AdoptionsRepository } from '@modules/adoptions/infra/typeorm/repositories/TypeormAdoptionsRepository';
import { ISignaturesRepository } from '@modules/patronize/domain/repositories/ISignaturesRepository';
import { SignaturesRepository } from '@modules/patronize/infra/typeorm/repositories/TypeormSignaturesRepository';
import { IPatronizesRepository } from '@modules/patronize/domain/repositories/IPatronizesRepository';
import { PatronizesRepository } from '@modules/patronize/infra/typeorm/repositories/TypeormPatronizesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IOngsRepository>('OngsRepository', OngsRepository);

container.registerSingleton<IOngsNotificationsRepository>(
  'OngsNotificationsRepository',
  OngsNotificationsRepository,
);

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ITutorsRepository>(
  'TutorsRepository',
  TutorsRepository,
);

container.registerSingleton<ITutorsNotificationsRepository>(
  'TutorsNotificationsRepository',
  TutorsNotificationsRepository,
);

container.registerSingleton<ICreditCardsRepository>(
  'CreditCardsRepository',
  CreditCardsRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<ICampaignsRepository>(
  'CampaignsRepository',
  CampaignsRepository,
);

container.registerSingleton<IDonationsRepository>(
  'DonationsRepository',
  DonationsRepository,
);

container.registerSingleton<IAnimalsRepository>(
  'AnimalsRepository',
  AnimalsRepository,
);

container.registerSingleton<IAnimalPicturesRepository>(
  'AnimalPicturesRepository',
  AnimalPicturesRepository,
);

container.registerSingleton<IAdoptionsRepository>(
  'AdoptionsRepository',
  AdoptionsRepository,
);

container.registerSingleton<ISignaturesRepository>(
  'SignaturesRepository',
  SignaturesRepository,
);

container.registerSingleton<IPatronizesRepository>(
  'PatronizesRepository',
  PatronizesRepository,
);
