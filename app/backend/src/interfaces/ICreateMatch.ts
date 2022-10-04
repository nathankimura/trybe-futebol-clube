export default interface ICreateMatch {
  id?: number,
  homeTeam?: number,
  awayTeam?: number,
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
}
