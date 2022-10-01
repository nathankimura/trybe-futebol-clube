import { Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import IUser from '../models/IUser';
import IDecoded from '../models/IDecoded';
import User from '../database/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class ValidateJWT {
  public model = User;
  public validateJWT = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const decoded = Jwt.verify(token as string, JWT_SECRET) as IDecoded;
    const { userId } = decoded;
    const user = await this.model.findOne({ where: { id: userId }, raw: true }) as IUser;
    const { role } = user;
    return res.status(200).json({ role });
  };
}
