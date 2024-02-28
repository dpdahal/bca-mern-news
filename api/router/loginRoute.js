import express from 'express';
import LoginController from '../controller/LoginController.js';

const loginRoute = express.Router();
const loignInstance = new LoginController();

loginRoute.post('/', loignInstance.login);

export default loginRoute;
