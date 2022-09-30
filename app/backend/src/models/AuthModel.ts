import * as Jwt from 'jsonwebtoken';
import User from '../database/models/user';
import IToken from './IToken';
import IUser from './IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class AuthModel {
  public model = User;
  public token = async (email: string): Promise<IToken> => {
    const jwtConfig = { expiresIn: '1d' };
    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;

    const token = Jwt.sign({ userId: user.id }, JWT_SECRET, jwtConfig);
    return token as unknown as IToken;
  };
}
