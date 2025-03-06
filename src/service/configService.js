import axios from "axios";
import { refreshToken } from "../utils/refreshToken";

const API_URL = "http://localhost:3000/api/v1/";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const newAccessToken = await refreshToken();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + newAccessToken;
      originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
