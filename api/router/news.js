import express from 'express';
import NewsController from '../controller/NewsController.js';
import RouteMiddleware from "../middleware/RouteMiddleware.js";
const auth = new RouteMiddleware();
const newsRoute = express.Router();

newsRoute.get('/', NewsController.index);
newsRoute.get('/:id', NewsController.show);
newsRoute.post('/',auth.check, NewsController.store);
newsRoute.put('/:id',auth.check, NewsController.update);
newsRoute.delete('/:id',auth.check, NewsController.destroy);

export default newsRoute;