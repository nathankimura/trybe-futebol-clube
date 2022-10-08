// import ILeaderboard from '../interfaces/ILeaderboard';
import Team from '../database/models/team';
import Match from '../database/models/match';
import LeaderboardUtils from '../utils/LeaderboardUtils';

export default class TeamModel {
  public teamModel = Team;
  public matchModel = Match;
  public testObject = {
    id: 12,
    teamName: 'Palmeiras',
    homeMatches: [
      {
        homeTeam: 12,
        homeTeamGoals: 2,
        awayTeam: 6,
        awayTeamGoals: 2,
      },
      {
        homeTeam: 12,
        homeTeamGoals: 4,
        awayTeam: 5,
        awayTeamGoals: 2,
      },
      {
        homeTeam: 12,
        homeTeamGoals: 4,
        awayTeam: 8,
        awayTeamGoals: 1,
      },
    ],
    awayMatches: [
      {
        homeTeam: 1,
        homeTeamGoals: 0,
        awayTeam: 12,
        awayTeamGoals: 3,
      },
      {
        homeTeam: 3,
        homeTeamGoals: 0,
        awayTeam: 12,
        awayTeamGoals: 4,
      },
    ],
  };

  constructor(private leaderboardUtils = new LeaderboardUtils()) {}

  public getAll = async (): Promise<any> => {
    const teams = await this.leaderboardUtils.getTeamsData();
    return teams;
  };

  public getAllTest = async (): Promise<any> => {
    const teams = await this.leaderboardUtils.getTeamsData();
    const formatTest = this.leaderboardUtils;
    const formatTeams = teams.map((team: any) => ({ name: team.teamName,
      totalPoints: formatTest.calcHomePoints(team),
      totalGames: team.homeMatches.length,
      totalVictories: formatTest.calcHomeVictories(team),
      totalDraws: formatTest.calcHomeDraws(team),
      totalLosses: formatTest.calcHomeLosses(team),
      goalsFavor: formatTest.calcGoalsFavor(team),
      goalsOwn: formatTest.calcGoalsOwn(team),
      goalsBalance: formatTest.calcGoalsBalance(team),
      efficiency: formatTest.calcHomeEfficiency(team) }));
    return formatTeams;
  };

  public orderTeams = async (): Promise<any> => {
    const teams = await this.getAllTest();
    const order = teams.sort((a: any, b: any) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return order;
  };

  public test = async (): Promise<any> => {
    const testObj = this.testObject;
    const testT = this.leaderboardUtils.calcHomeEfficiency(testObj);
    return testT;
  };
}
