import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import AuthRoutes from './route/auth.route';
import ProductRoutes from './route/products.route';
import CategoryRoutes from './route/category.route';
import CartRoutes from './route/cart.route';

const app: Application = express();
const authRoutes = new AuthRoutes();
const productRoutes = new ProductRoutes();
const categoryRoutes = new CategoryRoutes();
const cartRoutes = new CartRoutes();

const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.response.data.message) {
    res.status(error.response.status).json(error.response.data);
  } else {
    res.status(error.response.status).json(error.response.data);
  }
};

const corsOptions = {
  origin: [
    'http://localhost:4201',
    'http://localhost:4200',
    'http://localhost:4202',
    'http://localhost:4203',
    'http://localhost:4205',
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes.getRouter());
app.use('api/products', productRoutes.getRouter());
app.use('/api/products', productRoutes.getRouter());
app.use('/api/category', categoryRoutes.getRouter());
app.use('/api/carts', cartRoutes.getRouter());
app.use(errorHandler);
try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
