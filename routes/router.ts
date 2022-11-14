import * as express from "express";
import Apod from "./apod";

const appRouter = express.Router();

appRouter.use("/planetary/apod", Apod);

export default appRouter;
