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

  public getAllTest = async (homeAwayOrAll: string): Promise<ILeaderboard[]> => {
    const teams = await this.leaderboardUtils.getTeamsData();
    const format = this.leaderboardUtils;
    const formatTeams = teams.map((team: ILeaderboardTest) => ({ name: team.teamName,
      totalPoints: format.calcHomePoints(team, homeAwayOrAll),
      totalGames: this.gamesTotal(homeAwayOrAll, team),
      totalVictories: format.calcHomeVictories(team, homeAwayOrAll),
      totalDraws: format.calcHomeDraws(team, homeAwayOrAll),
      totalLosses: format.calcHomeLosses(team, homeAwayOrAll),
      goalsFavor: format.calcGoalsFavor(team, homeAwayOrAll),
      goalsOwn: format.calcGoalsOwn(team, homeAwayOrAll),
      goalsBalance: format.calcGoalsBalance(team, homeAwayOrAll),
      efficiency: format.calcHomeEfficiency(team, homeAwayOrAll) }));
    return formatTeams;
  };

  public orderTeams = async (homeAwayOrAll: string): Promise<ILeaderboard[]> => {
    const teams = await this.getAllTest(homeAwayOrAll);
    const order = teams.sort((a: ILeaderboard, b: ILeaderboard) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return order;
  };

  public gamesTotal = (homeAwayOrAll: string, team: ILeaderboardTest) => {
    if (homeAwayOrAll === 'home') return team.homeMatches.length;
    if (homeAwayOrAll === 'away') return team.awayMatches.length;
    return team.homeMatches.length + team.awayMatches.length;
  };
}
