import Team from '../database/models/team';
import Match from '../database/models/match';
import ILeaderboardTest from '../interfaces/ILeaderBoardTest';
import IMatchTest from '../interfaces/IMatchTest';

export default class LeaderboardUtils {
  public teamModel = Team;
  public matchModel = Match;

  public getTeamsData = async (): Promise<ILeaderboardTest[]> => {
    const teams = await this.teamModel.findAll({
      include: [
        {
          model: Match,
          as: 'homeMatches',
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
        {
          model: Match,
          as: 'awayMatches',
          where: { inProgress: false },
          attributes: { exclude: ['id', 'inProgress'] },
        },
      ],
    });
    return teams as unknown as ILeaderboardTest[];
  };

  public calcHomePoints = (testObj:ILeaderboardTest) => {
    const homeObj = testObj.homeMatches;
    const homePoints = homeObj.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homePoints;
  };

  public calcHomeVictories = (testObj:ILeaderboardTest) => {
    const homeObj = testObj.homeMatches;
    const homeVictories = homeObj.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeVictories;
  };

  public calcHomeDraws = (testObj:ILeaderboardTest) => {
    const homeObj = testObj.homeMatches;
    const homeDraws = homeObj.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeDraws;
  };

  public calcHomeLosses = (testObj:ILeaderboardTest) => {
    const homeObj = testObj.homeMatches;
    const homeLosses = homeObj.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeLosses;
  };

  public calcGoalsFavor = (testObj:ILeaderboardTest):number => {
    const homeObj = testObj.homeMatches;
    const totalGoalsFavor = homeObj.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);
    return totalGoalsFavor;
  };

  public calcGoalsOwn = (testObj:ILeaderboardTest):number => {
    const homeObj = testObj.homeMatches;
    const totalGoalsOwn = homeObj.map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);
    return totalGoalsOwn;
  };

  public calcGoalsBalance = (testObj:ILeaderboardTest): number => {
    const homeObj = testObj.homeMatches;
    const totalGoalsBalance = homeObj.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr) => acc + curr)
      - homeObj.map((element:IMatchTest) => element.awayTeamGoals)
        .reduce((acc: number, curr) => acc + curr);
    return totalGoalsBalance;
  };

  public calcHomeEfficiency = (testObj:ILeaderboardTest): string => {
    const homeObj = testObj.homeMatches;
    const P = this.calcHomePoints(testObj);
    const J = homeObj.length;
    const homeEfficiency = ((P / (J * 3)) * 100).toFixed(2);
    return homeEfficiency;
  };
}
