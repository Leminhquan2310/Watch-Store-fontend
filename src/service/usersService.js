import axios from "axios";
import { refreshToken } from "../components/auth";

const API_URL = "http://localhost:3000/api/v1/user";

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
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

export const getAllUser = async () => {
  try {
    const response = await instance.get("/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (data) => {
  const response = await instance.post("/create-user", data);
  return response;
};

export const updateUser = async (data) => {
  const response = await instance.put("/update-user", data);
  return response;
};

export const deleteUser = async (userId) => {
  await instance.delete("/delete-user", { data: { userId } });
};
