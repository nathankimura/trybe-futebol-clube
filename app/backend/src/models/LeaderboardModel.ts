import Team from '../database/models/team';
import Match from '../database/models/match';
import LeaderboardUtils from '../utils/LeaderboardUtils';
import ILeaderboard from '../interfaces/ILeaderboard';
import ILeaderboardTest from '../interfaces/ILeaderBoardTest';

export default class TeamModel {
  public teamModel = Team;
  public matchModel = Match;

  constructor(private leaderboardUtils = new LeaderboardUtils()) {}

  public getAllTest = async (): Promise<ILeaderboard[]> => {
    const teams = await this.leaderboardUtils.getTeamsData();
    const format = this.leaderboardUtils;
    const formatTeams = teams.map((team: ILeaderboardTest) => ({ name: team.teamName,
      totalPoints: format.calcHomePoints(team),
      totalGames: team.homeMatches.length,
      totalVictories: format.calcHomeVictories(team),
      totalDraws: format.calcHomeDraws(team),
      totalLosses: format.calcHomeLosses(team),
      goalsFavor: format.calcGoalsFavor(team),
      goalsOwn: format.calcGoalsOwn(team),
      goalsBalance: format.calcGoalsBalance(team),
      efficiency: format.calcHomeEfficiency(team) }));
    return formatTeams;
  };

  public orderTeams = async (): Promise<ILeaderboard[]> => {
    const teams = await this.getAllTest();
    const order = teams.sort((a: ILeaderboard, b: ILeaderboard) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return order;
  };
}
