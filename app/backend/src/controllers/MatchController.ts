import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import ICreateMatch from '../interfaces/ICreateMatch';
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

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    const params = req.body as ICreateMatch;
    const token = req.headers.authorization;
    const validateToken = decode(token as string);
    if (!token) {
      return res.status(404)
        .json({ message: 'Token not found' });
    }
    if (!validateToken) return res.status(401).json({ message: 'Token must be a valid token' });
    const matches = await this.matchService.createMatch(params);
    return res.status(201).json(matches);
  };

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    await this.matchService.finishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };

  public attOngoingMatches = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id;
    const { body } = req;
    await this.matchService.attOngoingMatches(id, body);
    return res.status(200).json({ body });
  };
}
