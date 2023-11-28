import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import axios from 'axios';
import AuthRoutes from './route/auth.route';
import { validateTokenMiddleware } from './middleware/auth.validator.cognito';
import ProductRoutes from './route/products.route';

const app: Application = express();
const authRoutes = new AuthRoutes();
const productRoutes = new ProductRoutes();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes.getRouter());
app.use(validateTokenMiddleware);
app.use('/api/products', productRoutes.getRouter());

try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
