import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class TeamController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.getAll();
    return res.status(200).json(teams);
  };

  public test = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.test();
    return res.status(200).json(teams);
  };
}
