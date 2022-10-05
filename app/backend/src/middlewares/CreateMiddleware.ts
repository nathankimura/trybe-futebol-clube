import { Request, Response, NextFunction } from 'express';
import ICreateMatch from '../interfaces/ICreateMatch';
import Team from '../database/models/team';

export default class CreateMiddleware {
  public modelTeam = Team;
  public validateCreate = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body as ICreateMatch;
    const existentAwayTeam = await this.modelTeam.findByPk(params.awayTeam);
    const existentHomeTeam = await this.modelTeam.findByPk(params.homeTeam);

    if (params.homeTeam === params.awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!existentAwayTeam || !existentHomeTeam) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
