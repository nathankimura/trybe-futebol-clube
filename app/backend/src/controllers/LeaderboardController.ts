import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class TeamController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getHomeTeams = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.orderTeams();
    return res.status(200).json(teams);
  };
}
