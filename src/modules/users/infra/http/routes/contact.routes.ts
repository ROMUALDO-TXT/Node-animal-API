import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ContactController from '../controllers/ContactController';

const contactRouter = Router();
const contactController = new ContactController();

contactRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  contactController.adminContact,
);

export default contactRouter;
