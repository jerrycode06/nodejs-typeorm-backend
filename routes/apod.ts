import * as express from "express";
import { Logger } from "../logger";
import { Ctrl_GetApodInformation } from "../controllers/apodController";

class Apod {
  public express: express.Application;
  public logger: Logger;
  public router;

  constructor() {
    this.express = express();
    this.router = express.Router();
    this.routes();
    this.logger = new Logger();
  }

  private routes(): void {
    this.router.get("/", Ctrl_GetApodInformation);
  }
}

export default new Apod().router;
