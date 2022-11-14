import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
const axios = require("axios");
import * as dotenv from "dotenv";

dotenv.config();

const addCustomHeaders = (config: AxiosRequestConfig<any>) => {
  const CustomHeaders = {
    "Content-Type": "application/json",
  };

  return { ...config, headers: { ...CustomHeaders, ...config.headers } };
};

// const transform = (response: AxiosResponse): AxiosResponse["data"] => {
//   return response.data;
// };

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NASA_BASE_URL,
});
axiosClient.interceptors.request.use(addCustomHeaders);
// axiosClient.interceptors.response.use(transform);

export default axiosClient;
