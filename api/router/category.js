import express from 'express';
import CategoryController from '../controller/CategoryController.js';
import RouteMiddleware from "../middleware/RouteMiddleware.js";
const auth = new RouteMiddleware();
const catRoute = express.Router();
const catInstance = new CategoryController();

catRoute.get('/', catInstance.index);
catRoute.get('/:id', catInstance.show);
catRoute.post('/',auth.check, catInstance.store);
catRoute.put('/:id',auth.check, catInstance.update);
catRoute.delete('/:id',auth.check, catInstance.destroy);

export default catRoute;