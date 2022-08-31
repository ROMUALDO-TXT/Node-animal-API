import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import AnimalsController from '../controllers/AnimalsController';
import approvedOng from '@shared/http/middlewares/approvedOng';

const animalsRouter = Router();
const animalsController = new AnimalsController();

const upload = multer(uploadConfig.multer);

animalsRouter.get('/', isAuthenticated('All'), animalsController.index);

animalsRouter.get(
  '/profile/:id',
  isAuthenticated('All'),
  animalsController.show,
);

animalsRouter.get(
  '/:type',
  isAuthenticated('All'),
  celebrate({
    [Segments.QUERY]: {
      sex: Joi.string().required().allow('Male', 'Female'),
      size: Joi.string().required().allow('P', 'M', 'G'),
      species: Joi.string().required(),
      name: Joi.string().optional(),
      city: Joi.string().optional(),
      minAge: Joi.number().min(0).optional(),
      maxAge: Joi.number().positive().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
    [Segments.PARAMS]: {
      type: Joi.string().required().allow('Adoption', 'Patronize'),
    },
  }),
  animalsController.listFilterAnimals,
);

animalsRouter.get(
  '/more/:id',
  isAuthenticated('All'),
  animalsController.findMore,
);

animalsRouter.post(
  '/:type',
  isAuthenticated('Ong'),
  approvedOng,
  upload.array('pictures', 5),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      costsDescription: Joi.string().optional(),
      sex: Joi.string().required().allow('Male', 'Female'),
      size: Joi.string().required().allow('P', 'M', 'G'),
      species: Joi.string().required(),
      bornDate: Joi.date().required(),
      shelterEnterDate: Joi.date().required(),
      monthlyCosts: Joi.number().optional(),
    },
    [Segments.PARAMS]: {
      type: Joi.string().required().allow('Adoption', 'Patronize'),
    },
  }),
  animalsController.create,
);

animalsRouter.put(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  upload.array('pictures', 5),
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      costsDescription: Joi.string().optional(),
      sex: Joi.string().required().allow('Male', 'Female'),
      size: Joi.string().required().allow('P', 'M', 'G'),
      species: Joi.string().required(),
      bornDate: Joi.date().required(),
      shelterEnterDate: Joi.date().required(),
      monthlyCosts: Joi.number().optional(),
      isApproved: Joi.boolean().required().default(true),
    },
  }),
  animalsController.update,
);

animalsRouter.delete(
  '/:id',
  isAuthenticated('Ong'),
  approvedOng,
  animalsController.delete,
);

export default animalsRouter;
