import { Router } from 'express';
import ProductController from '../controller/products.controller';

class ProductRoutes {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/create', this.productController.createProduct.bind(this.productController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ProductRoutes;
