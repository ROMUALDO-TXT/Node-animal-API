import uploadConfig from '@config/upload';
import multer from 'multer';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TutorsProfileController from '../controllers/TutorsProfileController';

const tutorsProfileRouter = Router();
const tutorsProfileController = new TutorsProfileController();

const upload = multer(uploadConfig.multer);

tutorsProfileRouter.use(isAuthenticated('Tutor'));

tutorsProfileRouter.put(
  '/',
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().required(),
      phone: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      zipcode: Joi.string().required(),
      picture: Joi.string().optional(),
    },
  }),
  tutorsProfileController.update,
);

tutorsProfileRouter.get('/', tutorsProfileController.showMyProfile);

tutorsProfileRouter.patch(
  '/banner',
  upload.single('banner'),
  tutorsProfileController.updateBanner,
);

tutorsProfileRouter.patch(
  '/password',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  tutorsProfileController.updatePassword,
);

tutorsProfileRouter.post(
  '/cards',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
      creditCardId: Joi.string().required(),
      last4CardNumber: Joi.string().required(),
      expirationMonth: Joi.string().required(),
      expirationYear: Joi.string().required(),
    },
  }),
  tutorsProfileController.createCard,
);

tutorsProfileRouter.get('/cards', tutorsProfileController.listTutorsCards);

tutorsProfileRouter.get(
  '/notifications',
  tutorsProfileController.listNotifications,
);

export default tutorsProfileRouter;
