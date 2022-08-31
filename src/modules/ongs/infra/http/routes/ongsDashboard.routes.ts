import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import OngsController from '../controllers/OngsController';
import EventsController from '@modules/events/infra/http/controllers/EventsController';
import AdoptionsController from '@modules/adoptions/infra/http/controllers/AdoptionController';
import AnimalsController from '@modules/animals/infra/http/controllers/AnimalsController';
import CampaignsController from '@modules/campaign/infra/http/controllers/CampaignsController';
import OngsProfileController from '../controllers/OngsProfileController';
import OngsBalanceController from '../controllers/OngsBalanceController';
import PatronizeController from '@modules/patronize/infra/http/controllers/PatronizeController';
import approvedOng from '@shared/http/middlewares/approvedOng';

const ongsDashboardRouter = Router();
const ongsController = new OngsController();
const ongsProfileController = new OngsProfileController();
const ongsBalanceController = new OngsBalanceController();
const animalsController = new AnimalsController();
const campaignsController = new CampaignsController();
const eventsController = new EventsController();
const adoptionsController = new AdoptionsController();
const patronizeController = new PatronizeController();

const upload = multer(uploadConfig.multer);

ongsDashboardRouter.use(isAuthenticated('Ong'));

ongsDashboardRouter.get(
  '/animals',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().optional(),
      isAvailable: Joi.boolean().required(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  animalsController.listPrivateOngAnimals,
);
ongsDashboardRouter.get(
  '/animals/:type',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().optional(),
      isAvailable: Joi.boolean().required(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
    [Segments.PARAMS]: {
      type: Joi.string().required().allow('Adoption', 'Patronize'),
    },
  }),
  animalsController.listPrivateOngAnimalsByType,
);

ongsDashboardRouter.patch(
  '/animals/available',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      animalId: Joi.string().required(),
      available: Joi.boolean().required(),
    },
  }),
  animalsController.updateAvailability,
);

ongsDashboardRouter.patch(
  '/animals/adopt',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      animalId: Joi.string().required(),
      available: Joi.boolean().required(),
    },
  }),
  animalsController.updateAdopted,
);

ongsDashboardRouter.get(
  '/patrons',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  patronizeController.listPatronsOng,
);

//campaigns
ongsDashboardRouter.get(
  '/campaigns',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().optional(),
      isAvailable: Joi.boolean().required(),
      isApproved: Joi.boolean().required(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  campaignsController.listPrivateOngCampaigns,
);
ongsDashboardRouter.patch(
  '/campaign',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      campaignId: Joi.string().required(),
      isActive: Joi.boolean().required(),
    },
  }),
  animalsController.updateAvailability,
);
ongsDashboardRouter.get(
  '/campaigns/donations',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      campaignId: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  campaignsController.listDonations,
);

//adoptions
//Set approved
ongsDashboardRouter.patch(
  '/adoptions/approve',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      adoptionId: Joi.string().required(),
    },
  }),
  adoptionsController.approveAdoption,
);

//Set denied
ongsDashboardRouter.patch(
  '/adoptions/deny',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      adoptionId: Joi.string().required(),
      motif: Joi.string().optional(),
    },
  }),
  adoptionsController.denyAdoption,
);

//Set in analysis
ongsDashboardRouter.patch(
  '/adoptions',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      adoptionId: Joi.string().required(),
    },
  }),
  adoptionsController.updateStatus,
);

ongsDashboardRouter.get(
  '/adoptions/open',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  adoptionsController.listOpenAdoptions,
);

//listAdoptionsTutors
ongsDashboardRouter.get(
  '/adoptions/:animalId',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
    [Segments.PARAMS]: {
      animalId: Joi.string().required(),
    },
  }),
  adoptionsController.listRequirementTutors,
);

//events
ongsDashboardRouter.get(
  '/events',
  approvedOng,
  celebrate({
    [Segments.QUERY]: {
      isActive: Joi.boolean().required(),
      name: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  eventsController.listOngEvents,
);

//bankAccounts
ongsDashboardRouter.post(
  '/balance/accounts',
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      documentType: Joi.string().required().allow('CPF', 'CNPJ'),
      document: Joi.string().optional(),
      bankNumber: Joi.number().required(),
      agencyNumber: Joi.number().required(),
      accountNumber: Joi.number().required(),
      accountType: Joi.string().required(),
    },
  }),
  ongsBalanceController.createBankAccount,
);

ongsDashboardRouter.get(
  '/balance/accounts',
  approvedOng,
  ongsBalanceController.listBankAccounts,
);

//notifications
ongsDashboardRouter.get('/notifications', ongsController.listNotifications);
ongsDashboardRouter.patch(
  '/notifications',
  celebrate({
    [Segments.BODY]: {
      notificationId: Joi.string().required(),
    },
  }),
  ongsController.markAsRead,
);

//update ong
ongsDashboardRouter.put(
  '/',
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.string().required(),
      phone: Joi.string().required(),
      description: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().optional(),
      zipcode: Joi.string().required(),
    },
  }),
  ongsProfileController.update,
);

ongsDashboardRouter.patch(
  '/password',
  celebrate({
    [Segments.BODY]: {
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ongsProfileController.updatePassword,
);

ongsDashboardRouter.patch(
  '/banner',
  approvedOng,
  upload.single('banner'),
  ongsProfileController.updateBanner,
);

export default ongsDashboardRouter;
