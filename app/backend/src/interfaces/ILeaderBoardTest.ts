import IMatchTest from './IMatchTest';

export default interface ILeaderboardTest {
  id: string,
  teamName: string,
  homeMatches: IMatchTest[],
  awayMatches: IMatchTest[],
}
