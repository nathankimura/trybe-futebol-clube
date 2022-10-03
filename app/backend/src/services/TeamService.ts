import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}
  public getAll = async () => {
    const teams = await this.teamModel.getAll();
    return teams;
  };

  public getById = async (id:number) => {
    const team = await this.teamModel.getById(id);
    return team;
  };
}
