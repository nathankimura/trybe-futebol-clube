import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class TeamController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getHomeTeams = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.orderTeams('home');
    return res.status(200).json(teams);
  };

  public getAwayTeams = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.orderTeams('away');
    return res.status(200).json(teams);
  };

  public getTeams = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.orderTeams('all');
    return res.status(200).json(teams);
  };

/*   public getTeamsTest = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.leaderboardService.getTeamsTest();
    return res.status(200).json(teams);
  }; */
}
