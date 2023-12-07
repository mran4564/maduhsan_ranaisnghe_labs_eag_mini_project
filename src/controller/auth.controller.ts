import { Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { UserCreateDTO } from '../model/auth.model';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const userReq: UserCreateDTO = req.body;
    try {
      const data = await this.authService.signUp(userReq);
      res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const data = await this.authService.signIn(email, password);
      res.status(200).json({ message: 'User signed in successfully', data });
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed', error });
    }
  }
}

export default AuthController;
