import { Router } from 'express';
import ProductController from '../controller/products.controller';
import { Roles, authorize } from '../middleware/auth.validator.cognito';

class ProductRoutes {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('', this.productController.createProduct.bind(this.productController));
    this.router.get('', this.productController.getProducts.bind(this.productController));
    this.router.get(
      '/:id',
      authorize(Roles.Supplier),
      this.productController.getProductById.bind(this.productController),
    );
    this.router.put('/:id', authorize(Roles.All), this.productController.updateProduct.bind(this.productController));
    this.router.delete(
      '/:id',
      authorize(Roles.Supplier),
      this.productController.deleteProduct.bind(this.productController),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ProductRoutes;
