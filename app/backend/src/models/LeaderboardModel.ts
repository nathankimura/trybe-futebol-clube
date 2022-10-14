import Team from '../database/models/team';
import Match from '../database/models/match';
import LeaderboardUtils from '../utils/LeaderboardUtils';
import ILeaderboard from '../interfaces/ILeaderboard';
import ILeaderboardTest from '../interfaces/ILeaderBoardTest';

export default class TeamModel {
  public teamModel = Team;
  public matchModel = Match;

  constructor(private leaderboardUtils = new LeaderboardUtils()) {}

  public getTeamsTest = async () => {
    const teams = await this.leaderboardUtils.getTeamsData();
    return teams;
  };

  public getAllTest = async (homeOrAway: string): Promise<ILeaderboard[]> => {
    const teams = await this.leaderboardUtils.getTeamsData();
    const format = this.leaderboardUtils;
    const formatTeams = teams.map((team: ILeaderboardTest) => ({ name: team.teamName,
      totalPoints: format.calcHomePoints(team, homeOrAway),
      totalGames: (homeOrAway === 'home') ? team.homeMatches.length : team.awayMatches.length,
      totalVictories: format.calcHomeVictories(team, homeOrAway),
      totalDraws: format.calcHomeDraws(team, homeOrAway),
      totalLosses: format.calcHomeLosses(team, homeOrAway),
      goalsFavor: format.calcGoalsFavor(team, homeOrAway),
      goalsOwn: format.calcGoalsOwn(team, homeOrAway),
      goalsBalance: format.calcGoalsBalance(team, homeOrAway),
      efficiency: format.calcHomeEfficiency(team, homeOrAway) }));
    return formatTeams;
  };

  public orderTeams = async (homeOrAway: string): Promise<ILeaderboard[]> => {
    const teams = await this.getAllTest(homeOrAway);
    const order = teams.sort((a: ILeaderboard, b: ILeaderboard) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return order;
  };
}
