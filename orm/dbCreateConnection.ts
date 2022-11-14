import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "./config";
import { Logger } from "../logger";

const logger = new Logger();

const AppDataSource = new DataSource(config);

export const InitializeConnection = () => {
  AppDataSource.initialize()
    .then(async () => {
      logger.info("Connected to Database");
    })
    .catch((err) => logger.error(err.message));
};

export const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with Database");
    }, delay);
  });
};
