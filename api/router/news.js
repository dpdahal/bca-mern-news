import express from 'express';
import NewsController from '../controller/NewsController.js';
import RouteMiddleware from "../middleware/RouteMiddleware.js";
const auth = new RouteMiddleware();
const instanceNews= new NewsController();
const newsRoute = express.Router();

newsRoute.get('/', instanceNews.index);
newsRoute.get('/:id', instanceNews.show);
newsRoute.post('/',auth.check, instanceNews.store);
newsRoute.put('/:id',auth.check, instanceNews.update);
newsRoute.delete('/:id',auth.check, instanceNews.destroy);

export default newsRoute;