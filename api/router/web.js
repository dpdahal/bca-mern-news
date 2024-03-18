import express from "express";
import userRoute from "./userRoute.js";
import loginRoute from "./loginRoute.js";
import catRoute from "./category.js";
import RouteMiddleware from "../middleware/RouteMiddleware.js";
const auth = new RouteMiddleware();


const webRouter = express.Router();
webRouter.get('/', (req, res) => {
    res.send('We are learning express');
});

webRouter.use('/user',auth.check, userRoute);
webRouter.use('/login', loginRoute);
webRouter.use('/category', catRoute);

export default webRouter;