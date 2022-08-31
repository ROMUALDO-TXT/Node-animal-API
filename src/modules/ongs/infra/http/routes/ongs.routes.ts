import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OngsController from '../controllers/OngsController';
import AnimalsController from '@modules/animals/infra/http/controllers/AnimalsController';
import CampaignsController from '@modules/campaign/infra/http/controllers/CampaignsController';
import OngsProfileController from '../controllers/OngsProfileController';

const ongsRouter = Router();
const ongsController = new OngsController();
const ongsProfileController = new OngsProfileController();
const animalsController = new AnimalsController();
const campaignsController = new CampaignsController();

ongsRouter.get('/', isAuthenticated('All'), ongsController.index);

ongsRouter.get(
  '/profile/:id',
  isAuthenticated('All'),
  ongsProfileController.showOthersProfile,
);

ongsRouter.get(
  '/profile/',
  isAuthenticated('All'),
  ongsProfileController.showMyProfile,
);

ongsRouter.get(
  '/animals',
  isAuthenticated('All'),
  celebrate({
    [Segments.QUERY]: {
      ongId: Joi.string().required(),
      type: Joi.string().required().allow('Adoption', 'Patronize'),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  animalsController.listPublicOngAnimals,
);

ongsRouter.get(
  '/campaigns',
  isAuthenticated('All'),
  celebrate({
    [Segments.QUERY]: {
      ongId: Joi.string().required(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  campaignsController.listPublicOngCampaigns,
);

ongsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cnpj: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().optional(),
      zipcode: Joi.string().required(),
    },
  }),
  ongsController.create,
);

export default ongsRouter;
