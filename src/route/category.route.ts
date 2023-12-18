import { Router } from 'express';
import CategoryController from '../controller/category.controller';
import ProductController from '../controller/products.controller';
import { Roles, authorize } from '../middleware/auth.validator.cognito';

class CategoryRoutes {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('', this.categoryController.createCategory.bind(this.categoryController));
    this.router.get('', this.categoryController.getAll.bind(this.categoryController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CategoryRoutes;
