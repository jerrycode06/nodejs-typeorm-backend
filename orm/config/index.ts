import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PlanetaryData } from "../entities/PlanetaryData.entity";

dotenv.config();

export const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  synchronize: true,
  logging: false,
  entities: [PlanetaryData],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
};
