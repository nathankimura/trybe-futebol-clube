/* import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import IDecoded from '../interfaces/IDecoded';
import User from '../database/models/user';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenValidateMiddleware {
  public modelUser = User;
  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decoded = Jwt.verify(token as string, JWT_SECRET) as IDecoded;
    const { userId } = decoded;
    const findUser = await this.modelUser.findOne({ where: { id: userId } }) as IUser;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (!findUser) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
 */
