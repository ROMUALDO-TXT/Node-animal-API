import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import CampaignsController from '../controllers/CampaignsController';
import approvedOng from '@shared/http/middlewares/approvedOng';

const campaignsRouter = Router();
const campaignsController = new CampaignsController();

const upload = multer(uploadConfig.multer);

campaignsRouter.get(
  '/',
  isAuthenticated('All'),
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  campaignsController.listActiveCampaigns,
);

campaignsRouter.get(
  '/:id',
  isAuthenticated('All'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  campaignsController.show,
);

campaignsRouter.get(
  '/more/:id',
  isAuthenticated('All'),
  campaignsController.listMore,
);

campaignsRouter.post(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  upload.single('picture'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      amountExpected: Joi.number().optional(),
      amountCollected: Joi.number().optional(),
      accountId: Joi.string().required(),
    },
  }),
  campaignsController.create,
);

campaignsRouter.put(
  '/',
  isAuthenticated('Ong'),
  approvedOng,
  upload.single('picture'),
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      idCampaign: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      amountExpected: Joi.number().optional(),
    },
  }),
  campaignsController.update,
);

campaignsRouter.delete(
  '/:id',
  isAuthenticated('Ong'),
  approvedOng,
  campaignsController.delete,
);

export default campaignsRouter;
