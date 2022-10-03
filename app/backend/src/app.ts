import * as express from 'express';
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddleware';
import ValidateJWT from './controllers/ValidateJWT';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
const validateJwt = new ValidateJWT();
const teamController = new TeamController();
const matchController = new MatchController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', authMiddleware.validate, authController.login);
    this.app.get('/login/validate', validateJwt.validateJWT);
    this.app.get('/teams', teamController.getAll);
    this.app.get('/teams/:id', teamController.getById);
    this.app.get('/matches', matchController.getAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
