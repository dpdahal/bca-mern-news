import express from "express";
import userRoute from "./userRoute.js";


const webRouter = express.Router();
// all routers file register here
webRouter.get('/', (req, res) => {
    res.send('We are learning express');
});

webRouter.use('/user', userRoute);

export default webRouter;