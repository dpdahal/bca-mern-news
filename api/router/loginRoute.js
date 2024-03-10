import express from 'express';
import LoginController from '../controller/LoginController.js';

const loginRoute = express.Router();
const loignInstance = new LoginController();

loginRoute.post('/', loignInstance.login);
loginRoute.get('/token-verify', loignInstance.tokenVerify);
export default loginRoute;
