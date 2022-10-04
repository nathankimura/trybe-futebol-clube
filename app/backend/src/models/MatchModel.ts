import Team from '../database/models/team';
import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import ICreateMatch from '../interfaces/ICreateMatch';

export default class MatchModel {
  public matchModel = Match;

  public getAll = async (): Promise<IMatch[]> => {
    const matches = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches as unknown as IMatch[];
  };

  public getQuery = async (query: string): Promise<IMatch[]> => {
    const matches = await this.matchModel.findAll({ where: { inProgress: query },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches as unknown as IMatch[];
  };

  public createMatch = async (obj: ICreateMatch): Promise<ICreateMatch> => {
    const matches = await this.matchModel.create(obj);
    return matches as unknown as ICreateMatch;
  };

  public finishMatch = async (id: number) => {
    await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}
