import ITeam from '../interfaces/ITeam';
import Team from '../database/models/team';

export default class TeamModel {
  public teamModel = Team;

  public getAll = async (): Promise<ITeam[]> => {
    const Teams = await this.teamModel.findAll();
    return Teams;
  };

  public getById = async (id:number): Promise<ITeam> => {
    const team = await this.teamModel.findByPk(id);
    return team as ITeam;
  };
}
