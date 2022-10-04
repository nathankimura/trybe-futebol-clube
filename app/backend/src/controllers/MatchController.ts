import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const query = req.query.inProgress;
    if (!req.query.inProgress) {
      const matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    }
    const matches = await this.matchService.getQuery(query as unknown as string);
    return res.status(200).json(matches);
  };
}
