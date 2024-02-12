import { Router } from 'express';
import AuthController from '../controller/auth.controller';

class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/signup', this.authController.signUp.bind(this.authController));
    this.router.post('/signin', this.authController.signIn.bind(this.authController));
    this.router.post('/refresh-token', this.authController.refreshToken.bind(this.authController));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AuthRoutes;
