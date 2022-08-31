import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EventsController from '@modules/events/infra/http/controllers/EventsController';
import TutorsController from '@modules/tutors/infra/http/controllers/TutorsController';
import CampaignsController from '@modules/campaign/infra/http/controllers/CampaignsController';
import UsersController from '../controllers/UsersController';
import OngsController from '@modules/ongs/infra/http/controllers/OngsController';

const adminRouter = Router();
const usersController = new UsersController();
const eventsController = new EventsController();
const campaignsController = new CampaignsController();
const ongsController = new OngsController();
const tutorsController = new TutorsController();

adminRouter.use(isAuthenticated('Admin'));

//volunteers
adminRouter.post(
  '/volunteers',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      sendViaEmail: Joi.boolean().required(),
    },
  }),
  usersController.createVolunteer,
);

adminRouter.get(
  '/volunteers',
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  usersController.listVolunteers,
);

adminRouter.get(
  '/tutors',
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  tutorsController.index,
);

adminRouter.get(
  '/ongs',
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  ongsController.index,
);

adminRouter.patch(
  '/ongs/approve',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  ongsController.approve,
);

adminRouter.get(
  '/events',
  celebrate({
    [Segments.QUERY]: {
      isActive: Joi.boolean().required(),
      name: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  eventsController.index,
);

adminRouter.patch(
  '/events/approve',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  eventsController.approve,
);

adminRouter.get(
  '/campaigns',
  celebrate({
    [Segments.QUERY]: {
      isApproved: Joi.boolean().required(),
      name: Joi.string().optional(),
      skip: Joi.number().min(0).optional().default(0),
      take: Joi.number().min(1).optional().default(15),
    },
  }),
  campaignsController.index,
);

adminRouter.patch(
  '/campaigns/approve',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      isApproved: Joi.boolean().required(),
    },
  }),
  campaignsController.updateApprovalStatus,
);

export default adminRouter;
