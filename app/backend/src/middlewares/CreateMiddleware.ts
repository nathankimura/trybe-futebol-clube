import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import ICreateMatch from '../interfaces/ICreateMatch';
import IDecoded from '../interfaces/IDecoded';
import Team from '../database/models/team';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class CreateMiddleware {
  public modelTeam = Team;
  public validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body as ICreateMatch;
    const token = req.headers.authorization;
    const existentAwayTeam = await this.modelTeam.findByPk(params.awayTeam);
    const existentHomeTeam = await this.modelTeam.findByPk(params.homeTeam);
    const decoded = Jwt.verify(token as string, JWT_SECRET) as IDecoded;
    if (!token) throw new Error('No headers found');

    if (params.homeTeam === params.awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!existentAwayTeam || !existentHomeTeam) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    if (!decoded) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
