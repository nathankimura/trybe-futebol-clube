import LoginDto from '../controllers/dto/LoginDto';
import AuthModel from '../models/AuthModel';

export default class AuthService {
  constructor(private authModel = new AuthModel()) {}
  public token = async (params: LoginDto) => {
    const token = await this.authModel.token(params.email);
    return token;
  };
}
