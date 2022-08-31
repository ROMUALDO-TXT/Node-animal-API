import animalsRouter from '@modules/animals/infra/http/routes/animals.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import campaignsRouter from '@modules/campaign/infra/http/routes/campaigns.routes';
import contactRouter from '@modules/users/infra/http/routes/contact.routes';
import passwordRouter from '@modules/users/infra/http/routes/passwords.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import tutorsProfileRouter from '@modules/tutors/infra/http/routes/tutorsProfile.routes';
import tutorsRouter from '@modules/tutors/infra/http/routes/Tutors.routes';
import adoptionsRouter from '@modules/adoptions/infra/http/routes/adoption.routes';
import adminRouter from '@modules/users/infra/http/routes/admin.routes';
import patronizeRouter from '@modules/patronize/infra/http/routes/patronize.routes';
import ongsDashboardRouter from '@modules/ongs/infra/http/routes/ongsDashboard.routes';
import ongsRouter from '@modules/ongs/infra/http/routes/ongs.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});

routes.use('/users', passwordRouter);
routes.use('/session', sessionsRouter);
routes.use('/contact', contactRouter);
routes.use('/admin', adminRouter);
routes.use('/tutors', tutorsRouter);
routes.use('/tutors/profile', tutorsProfileRouter);
routes.use('/ongs', ongsRouter);
routes.use('/ongs/dashboard', ongsDashboardRouter);
routes.use('/animals', animalsRouter);
routes.use('/campaign', campaignsRouter);
routes.use('/events', eventsRouter);
routes.use('/adoption', adoptionsRouter);
routes.use('/patronize', patronizeRouter);

export default routes;
