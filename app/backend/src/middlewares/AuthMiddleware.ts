import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import User from '../database/models/user';

export default class AuthMiddleware {
  public modelUser = User;
  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });

    const findUser = await this.modelUser.findOne({ where: { email }, raw: true }) as IUser;
    if (!findUser) return res.status(401).json({ message: 'Incorrect email or password' });
    if (!bcrypt.compareSync(password, findUser.password as string)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}
