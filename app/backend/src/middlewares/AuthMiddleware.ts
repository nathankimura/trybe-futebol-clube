import { Request, Response, NextFunction } from 'express';
import User from '../database/models/user';

export default class AuthMiddleware {
  public modelUser = User;
  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const emailUser = await this.modelUser.findOne({ where: { email }, raw: true });
    const passwordUser = await this.modelUser.findOne({ where: { password }, raw: true });

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    if (!emailUser) return res.status(401).json({ message: 'Incorrect email or password' });
    if (!passwordUser) return res.status(401).json({ message: 'Incorrect email or password' });

    next();
  };
}
