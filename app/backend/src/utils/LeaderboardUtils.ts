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

  public calcHomePoints = (teamObj:ILeaderboardTest, homeOrAway: string) => {
    const homePoints = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 3; }
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    const awayPoints = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) { return acc + 3; }
      if (curr.awayTeamGoals === curr.homeTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    if (homeOrAway === 'home') {
      return homePoints;
    }
    return awayPoints;
  };

  public calcHomeVictories = (teamObj:ILeaderboardTest, homeOrAway: string) => {
    const homeVictories = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayVictories = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    if (homeOrAway === 'home') {
      return homeVictories;
    }
    return awayVictories;
  };

  public calcHomeDraws = (teamObj:ILeaderboardTest, homeOrAway: string) => {
    const homeDraws = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayDraws = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    if (homeOrAway === 'home') {
      return homeDraws;
    }
    return awayDraws;
  };

  public calcHomeLosses = (teamObj:ILeaderboardTest, homeOrAway: string) => {
    const homeLosses = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayLosses = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    if (homeOrAway === 'home') {
      return homeLosses;
    }
    return awayLosses;
  };

  public calcGoalsFavor = (teamObj:ILeaderboardTest, homeOrAway: string):number => {
    const totalGoalsFavor = teamObj.homeMatches
      .map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    const totalGoalsFavorAway = teamObj.awayMatches
      .map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    if (homeOrAway === 'home') {
      return totalGoalsFavor;
    }
    return totalGoalsFavorAway;
  };

  public calcGoalsOwn = (teamObj:ILeaderboardTest, homeOrAway: string):number => {
    const totalGoalsOwn = teamObj.homeMatches.map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    const totalGoalsOwnAway = teamObj.awayMatches.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    if (homeOrAway === 'home') {
      return totalGoalsOwn;
    }
    return totalGoalsOwnAway;
  };

  public calcGoalsBalance = (teamObj:ILeaderboardTest, homeOrAway: string): number => {
    const totalGoalsBalance = teamObj.homeMatches.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr) => acc + curr)
      - teamObj.homeMatches.map((element:IMatchTest) => element.awayTeamGoals)
        .reduce((acc: number, curr) => acc + curr);

    const totalGoalsBalanceAway = teamObj.awayMatches
      .map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr) => acc + curr)
      - teamObj.awayMatches.map((element:IMatchTest) => element.homeTeamGoals)
        .reduce((acc: number, curr) => acc + curr);

    if (homeOrAway === 'home') {
      return totalGoalsBalance;
    }
    return totalGoalsBalanceAway;
  };

  public calcHomeEfficiency = (teamObj:ILeaderboardTest, homeOrAway: string): string => {
    let homeAwayObj = teamObj.homeMatches;
    if (homeOrAway === 'away') {
      homeAwayObj = teamObj.awayMatches;
    }
    const P = this.calcHomePoints(teamObj, homeOrAway);
    const J = homeAwayObj.length;
    const homeEfficiency = ((P / (J * 3)) * 100).toFixed(2);
    return homeEfficiency;
  };
}
