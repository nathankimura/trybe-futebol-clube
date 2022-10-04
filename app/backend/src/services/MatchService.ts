import ICreateMatch from '../interfaces/ICreateMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}
  public getAll = async () => {
    const matches = await this.matchModel.getAll();
    return matches;
  };

  public getQuery = async (query: string) => {
    if (query === 'true') {
      const matches = await this.matchModel.getQuery('1');
      return matches;
    }
    const matches = await this.matchModel.getQuery('0');
    return matches;
  };

  public createMatch = async (obj: ICreateMatch) => {
    const matches = await this.matchModel.createMatch(obj);
    return matches;
  };
}
