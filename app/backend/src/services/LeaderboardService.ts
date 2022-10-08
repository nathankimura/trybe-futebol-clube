import LeaderboardModel from '../models/LeaderboardModel';

export default class TeamService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}
  public getAll = async () => {
    const teams = await this.leaderboardModel.getAll();
    return teams;
  };

  public test = async () => {
    const teams = await this.leaderboardModel.orderTeams();
    return teams;
  };
}
