import LeaderboardModel from '../models/LeaderboardModel';

export default class TeamService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  public orderTeams = async (homeAwayOrAll: string) => {
    const teams = await this.leaderboardModel.orderTeams(homeAwayOrAll);
    return teams;
  };

  public getTeamsTest = async () => {
    const teams = await this.leaderboardModel.getTeamsTest();
    return teams;
  };
}
