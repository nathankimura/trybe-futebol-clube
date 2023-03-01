import * as express from 'express';
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddleware';
import CreateMiddleware from './middlewares/CreateMiddleware';
import ValidateJWT from './controllers/ValidateJWT';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';
import LeaderboardController from './controllers/LeaderboardController';

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
const createMiddleware = new CreateMiddleware();
const validateJwt = new ValidateJWT();
const teamController = new TeamController();
const matchController = new MatchController();
const leaderboardController = new LeaderboardController();

const router = express.Router();

router.post('/login', authMiddleware.validate, authController.login);
router.get('/login/validate', validateJwt.validateJWT);
router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.getById);
router.get('/matches', matchController.getAll);
router.post(
  '/matches',
  createMiddleware.validateCreate,
  matchController.createMatch,
);
router.patch('/matches/:id/finish', matchController.finishMatch);
router.patch('/matches/:id', matchController.attOngoingMatches);
router.get('/leaderboard/home', leaderboardController.getHomeTeams);
router.get('/leaderboard/away', leaderboardController.getAwayTeams);
router.get('/leaderboard', leaderboardController.getTeams);
// router.get('/leaderboard/test', leaderboardController.getTeamsTest);

export default router;
