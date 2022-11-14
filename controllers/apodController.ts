import { Request, Response } from "express";
import { Logger } from "../logger";
import { Serv_GetApodInformation } from "../services/apodService";
import { HTTPStatusCodes, StatusMsg } from "../constants";

const logger = new Logger();

export async function Ctrl_GetApodInformation(req: Request, res: Response) {
  logger.info(`URL --> ${req.url}`);
  logger.info(`Query Param --> ${req.query.date}`);
  try {
    const result = await Serv_GetApodInformation(req.query.date as string);
    if (result) {
      res
        .status(HTTPStatusCodes.Ok)
        .send({ error: null, status: StatusMsg.Ok, data: result });
    } else {
      res
        .status(HTTPStatusCodes.NotFound)
        .send({
          error: StatusMsg.NotFound,
          status: StatusMsg.Fail,
          data: result,
        });
    }
  } catch (err) {
    logger.error(err.message);
    res.send({ error: err.message, status: StatusMsg.Fail, data: null });
  }
}
