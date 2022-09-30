import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import User from '../database/models/user';

export default class AuthController {
  constructor(private authService = new AuthService()) {}
  public modelUser = User;
  public login = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.authService.token(req.body);
    return res.status(200).json({ token });
  };
}
