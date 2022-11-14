import * as express from "express";
import * as bodyParser from "body-parser";
import appRouter from "./routes/router";
const cors = require("cors");

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static("public"));
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use("/api", appRouter);
  }
}

export default new App().express;
