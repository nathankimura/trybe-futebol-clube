import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}
  public getAll = async () => {
    const matches = await this.matchModel.getAll();
    return matches;
  };
}
