import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '@shared/container';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { isCelebrateError } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (isCelebrateError(err)) {
    const values = err.details.values();

    let { message } = values.next().value.details[0];

    message = message.replace(`"`, ``).replace(`"`, ``);

    return res.status(400).json({
      status: 'error',

      message: message || 'no message',
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log({ err });

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log(`Listening on port ${process.env.APP_API_URL}`);
});
