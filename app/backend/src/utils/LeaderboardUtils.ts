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

  public calcHomePoints = (teamObj:ILeaderboardTest, homeAwayOrAll: string) => {
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

    if (homeAwayOrAll === 'home') {
      return homePoints;
    } if (homeAwayOrAll === 'away') {
      return awayPoints;
    }
    return homePoints + awayPoints;
  };

  public calcHomeVictories = (teamObj:ILeaderboardTest, homeAwayOrAll: string) => {
    const homeVictories = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayVictories = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    if (homeAwayOrAll === 'home') {
      return homeVictories;
    } if (homeAwayOrAll === 'away') {
      return awayVictories;
    }
    return homeVictories + awayVictories;
  };

  public calcHomeDraws = (teamObj:ILeaderboardTest, homeAwayOrAll: string) => {
    const homeDraws = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayDraws = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals === curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    if (homeAwayOrAll === 'home') {
      return homeDraws;
    } if (homeAwayOrAll === 'away') {
      return awayDraws;
    }
    return homeDraws + awayDraws;
  };

  public calcHomeLosses = (teamObj:ILeaderboardTest, homeAwayOrAll: string) => {
    const homeLosses = teamObj.homeMatches.reduce((acc: number, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);

    const awayLosses = teamObj.awayMatches.reduce((acc: number, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) { return acc + 1; }
      return acc + 0;
    }, 0);
    if (homeAwayOrAll === 'home') {
      return homeLosses;
    } if (homeAwayOrAll === 'away') {
      return awayLosses;
    }
    return homeLosses + awayLosses;
  };

  public calcGoalsFavor = (teamObj:ILeaderboardTest, homeAwayOrAll: string):number => {
    const totalGoalsFavor = teamObj.homeMatches
      .map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    const totalGoalsFavorAway = teamObj.awayMatches
      .map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    if (homeAwayOrAll === 'home') {
      return totalGoalsFavor;
    } if (homeAwayOrAll === 'away') {
      return totalGoalsFavorAway;
    }
    return totalGoalsFavor + totalGoalsFavorAway;
  };

  public calcGoalsOwn = (teamObj:ILeaderboardTest, homeAwayOrAll: string):number => {
    const totalGoalsOwn = teamObj.homeMatches.map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    const totalGoalsOwnAway = teamObj.awayMatches.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr: number) => acc + curr);

    if (homeAwayOrAll === 'home') {
      return totalGoalsOwn;
    } if (homeAwayOrAll === 'away') {
      return totalGoalsOwnAway;
    }
    return totalGoalsOwn + totalGoalsOwnAway;
  };

  public calcGoalsBalance = (teamObj:ILeaderboardTest, homeAwayOrAll: string): number => {
    const totalGoalsBalance = teamObj.homeMatches.map((element:IMatchTest) => element.homeTeamGoals)
      .reduce((acc: number, curr) => acc + curr)
      - teamObj.homeMatches.map((element:IMatchTest) => element.awayTeamGoals)
        .reduce((acc: number, curr) => acc + curr);

    const totalGoalsBalanceAway = teamObj.awayMatches
      .map((element:IMatchTest) => element.awayTeamGoals)
      .reduce((acc: number, curr) => acc + curr)
      - teamObj.awayMatches.map((element:IMatchTest) => element.homeTeamGoals)
        .reduce((acc: number, curr) => acc + curr);

    if (homeAwayOrAll === 'home') {
      return totalGoalsBalance;
    } if (homeAwayOrAll === 'away') {
      return totalGoalsBalanceAway;
    }
    return totalGoalsBalance + totalGoalsBalanceAway;
  };

  public calcHomeEfficiency = (teamObj:ILeaderboardTest, homeAwayOrAll: string): string => {
    let homeAwayObj = teamObj.homeMatches;
    if (homeAwayOrAll === 'away') {
      homeAwayObj = teamObj.awayMatches;
    }
    const P = this.calcHomePoints(teamObj, homeAwayOrAll);
    const J = homeAwayObj.length;
    const homeEfficiency = ((P / (J * 3)) * 100).toFixed(2);
    if (homeAwayOrAll === 'all') {
      const P1 = this.calcHomePoints(teamObj, 'all');
      const J1 = teamObj.awayMatches.length + teamObj.homeMatches.length;
      const homeEfficiency1 = ((P1 / (J1 * 3)) * 100).toFixed(2);
      return homeEfficiency1;
    }
    return homeEfficiency;
  };
}
