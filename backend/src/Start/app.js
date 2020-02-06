import './bootstrap';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import path from 'path';
import routes from './routes';
import sentryConfig from '../Config/sentry';
import ExceptionHandler from '../App/Exceptions/Handler';

import '../Database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      process.env.NODE_ENV !== 'test'
        ? express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        : express.static(
            path.resolve(__dirname, '..', '__tests__', 'utils', 'files')
          )
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(ExceptionHandler);
  }
}

export default new App().server;
