import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TutorsController from '../controllers/TutorsController';

const tutorsRouter = Router();
const tutorsController = new TutorsController();

//Rota de criação de tutor
tutorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().required(),
      phone: Joi.string().required(),
      password: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      zipcode: Joi.string().required(),
    },
  }),
  tutorsController.create,
);

export default tutorsRouter;
