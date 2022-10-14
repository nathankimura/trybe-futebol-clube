import LeaderboardModel from '../models/LeaderboardModel';

export default class TeamService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  public orderTeams = async () => {
    const teams = await this.leaderboardModel.orderTeams();
    return teams;
  };
}
