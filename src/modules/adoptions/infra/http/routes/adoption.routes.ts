import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AdoptionsController from '../controllers/AdoptionController';

const adoptionsRouter = Router();
const adoptionsController = new AdoptionsController();
adoptionsRouter.use(isAuthenticated('Tutor'));

adoptionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      animalId: Joi.string().required(),
    },
  }),
  adoptionsController.create,
);
adoptionsRouter.patch(
  '/cancel',
  celebrate({
    [Segments.BODY]: {
      adoptionId: Joi.string().required(),
    },
  }),
  adoptionsController.cancel,
);

export default adoptionsRouter;
