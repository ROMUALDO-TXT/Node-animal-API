import uploadConfig from '@config/upload';
import multer from 'multer';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EventsController from '../controllers/EventsController';
import approvedOng from '@shared/http/middlewares/approvedOng';

const eventsRouter = Router();
const eventsController = new EventsController();

const upload = multer(uploadConfig.multer);

//Rota de criação de event
eventsRouter.post(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  upload.single('picture'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      type: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      zipcode: Joi.string().required(),
    },
  }),

  eventsController.create,
);

eventsRouter.put(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  upload.single('picture'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      type: Joi.string().required(),
      eventId: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().required(),
      zipcode: Joi.string().required(),
    },
  }),

  eventsController.update,
);

eventsRouter.get(
  '/show',
  isAuthenticated('All'),
  celebrate({
    [Segments.BODY]: {
      eventId: Joi.string().required(),
    },
  }),
  eventsController.show,
);

eventsRouter.get(
  '/',
  isAuthenticated('All'),
  celebrate({
    [Segments.QUERY]: {
      state: Joi.string().required(),
      type: Joi.string().required(),
      period: Joi.string().optional(),
      name: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  eventsController.listActiveEvents,
);

eventsRouter.delete(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  eventsController.delete,
);

export default eventsRouter;
