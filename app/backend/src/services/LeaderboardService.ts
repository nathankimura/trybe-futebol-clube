import LeaderboardModel from '../models/LeaderboardModel';

export default class TeamService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  public orderTeams = async (homeOrAway: string) => {
    const teams = await this.leaderboardModel.orderTeams(homeOrAway);
    return teams;
  };

  public getTeamsTest = async () => {
    const teams = await this.leaderboardModel.getTeamsTest();
    return teams;
  };
}
