import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default class AuthController {
  constructor(private authService = new AuthService()) {}
  public login = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.authService.token(req.body);
    return res.status(200).json({ token });
  };
}
