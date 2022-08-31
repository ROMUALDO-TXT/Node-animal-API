import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PatronizeController from '../controllers/PatronizeController';

const patronizeRouter = Router();
const patronizeController = new PatronizeController();

patronizeRouter.use(isAuthenticated('Tutor'));

patronizeRouter.post(
  '/request',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      planName: Joi.string().required(),
      planAmount: Joi.number().required(),
      planId: Joi.string().required(),
      animalId: Joi.string().required(),
    },
  }),
  patronizeController.createRequest,
);

patronizeRouter.post(
  '/confirm',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      patronizeId: Joi.string().required(),
      status: Joi.string()
        .required()
        .allow('ACTIVE', 'INACTIVE', 'CONCLUDED', 'CANCELED', 'FAILED'),
      createdOn: Joi.date().required(),
      startsOn: Joi.date().required(),
      nextBillingDate: Joi.date().required(),
      dueDay: Joi.string().required(),
      accessLink: Joi.string().required(),
    },
  }),
  patronizeController.confirmPatronize,
);

patronizeRouter.delete(
  '/failed_requirement',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  patronizeController.deleteRequirement,
);

export default patronizeRouter;
