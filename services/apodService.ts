import "reflect-metadata";
import { getDataSource } from "../orm/dbCreateConnection";
import { PlanetaryData } from "../orm/entities/PlanetaryData.entity";
import axiosClient from "../utils/axiosClient";
import * as dotenv from "dotenv";
import { Logger } from "../logger";
import { IApodApiResponse } from "../types/ApiResponse";
import { makeId } from "../utils";
import { ErrorMsg } from "../constants";

const fs = require("fs");

dotenv.config();
const logger = new Logger();

export async function Serv_GetApodInformation(dateParam: string) {
  const dataSource = await getDataSource();
  let result = await dataSource.manager.findOneBy(PlanetaryData, {
    date: dateParam,
  });
  if (result) {
    logger.debug("Got the result");
    return result;
  }

  const apiResponse: IApodApiResponse = await Serv_GetApodInfoFromApi(
    dateParam
  );
  if (!apiResponse) {
    return { message: ErrorMsg.API_FAIL };
  }

  const { date, explanation, media_type, service_version, title, url } =
    apiResponse;
  let imageUrl = url;
  const imageName = `image${makeId(10)}`;
  if (media_type === "image") {
    logger.debug("IMAGE UPLOAD CONDITION");
    let filePath = `${__dirname}/../public/uploads/${imageName}.jpg`;
    const uploadImgRes = await Serv_DownloadImageFromUrl(url, filePath);
    if (!uploadImgRes) {
      return { message: ErrorMsg.UPLOAD_FAIL };
    }
    imageUrl = `${process.env.UPLOAD_BASE_URL}${imageName}.jpg`;
  }

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(PlanetaryData)
    .values({
      date,
      explanation,
      media_type,
      service_version,
      title,
      url: imageUrl,
    })
    .execute();
  return {
    ...apiResponse,
    url: `${process.env.UPLOAD_BASE_URL}${imageName}.jpg`,
  };
}

export async function Serv_GetApodInfoFromApi(date: string) {
  const url = `${process.env.NASA_BASE_URL}?api_key=${process.env.NASA_API_KEY}&date=${date}`;
  try {
    const response = await axiosClient.get(url);
    return response?.data;
  } catch (err: any) {
    logger.error(err.message);
    return false;
  }
}

export async function Serv_DownloadImageFromUrl(url: string, filePath: string) {
  try {
    const fileData = await axiosClient.get(url, { responseType: "stream" });
    return new Promise((resolve, reject) => {
      fileData.data
        .pipe(fs.createWriteStream(filePath))
        .on("error", reject)
        .once("close", () => resolve(filePath));
    });
  } catch (err: any) {
    logger.error(err.message);
    return false;
  }
}
