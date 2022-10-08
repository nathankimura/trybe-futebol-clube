import Team from '../database/models/team';
import Match from '../database/models/match';

export default class LeaderboardUtils {
  public teamModel = Team;
  public matchModel = Match;

  public getTeamsData = async (): Promise<any> => {
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
    return teams;
  };

  public calcHomePoints = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const homePoints = homeObj.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homePoints;
  };

  public calcHomeVictories = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const homeVictories = homeObj.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeVictories;
  };

  public calcHomeDraws = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const homeDraws = homeObj.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeDraws;
  };

  public calcHomeLosses = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const homeLosses = homeObj.reduce((acc: number, curr: any) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    return homeLosses;
  };

  public calcGoalsFavor = (testObj:any):Promise<number> => {
    const homeObj = testObj.homeMatches;
    const totalGoalsFavor = homeObj.map((element:any) => element.homeTeamGoals)
      .reduce((acc: number, curr: any) => acc + curr);
    return totalGoalsFavor;
  };

  public calcGoalsOwn = (testObj:any):Promise<number> => {
    const homeObj = testObj.homeMatches;
    const totalGoalsOwn = homeObj.map((element:any) => element.awayTeamGoals)
      .reduce((acc: number, curr: any) => acc + curr);
    return totalGoalsOwn;
  };

  public calcGoalsBalance = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const totalGoalsBalance = homeObj.map((element:any) => element.homeTeamGoals)
      .reduce((acc: number, curr: any) => acc + curr)
      - homeObj.map((element:any) => element.awayTeamGoals)
        .reduce((acc: number, curr: any) => acc + curr);
    return totalGoalsBalance;
  };

  public calcHomeEfficiency = (testObj:any) => {
    const homeObj = testObj.homeMatches;
    const P = this.calcHomePoints(testObj);
    const J = homeObj.length;
    const homeEfficiency = ((P / (J * 3)) * 100).toFixed(2);
    return homeEfficiency;
  };
}
