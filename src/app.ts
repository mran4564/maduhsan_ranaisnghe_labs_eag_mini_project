import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import AuthRoutes from './route/auth.route';
import ProductRoutes from './route/products.route';
import CategoryRoutes from './route/category.route';
import CartRoutes from './route/cart.route';
import OrderRoutes from './route/order.route';
import { errorHandler } from './helpers/error.handler';

const app: Application = express();
const authRoutes = new AuthRoutes();
const productRoutes = new ProductRoutes();
const categoryRoutes = new CategoryRoutes();
const cartRoutes = new CartRoutes();
const orderRoutes = new OrderRoutes();

const corsOptions = {
  origin: [
    'http://localhost:4200',
    'http://localhost:4201',
    'http://localhost:4202',
    'http://localhost:4203',
    'http://localhost:4205',
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // Add a one-second delay
  setTimeout(() => {
    next(); // Continue to the next middleware or route handler
  }, 1000); // 1000 milliseconds (1 second) delay
});
app.use('/api/v1/auth', authRoutes.getRouter());
app.use('/api/v1/products', productRoutes.getRouter());
app.use('/api/v1/category', categoryRoutes.getRouter());
app.use('/api/v1/carts', cartRoutes.getRouter());
app.use('/api/v1/orders', orderRoutes.getRouter());
app.use(errorHandler);
try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
