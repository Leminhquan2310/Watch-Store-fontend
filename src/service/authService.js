import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth/";
const instance = axios.create({
  baseURL: API_URL,
});

export const login = async (data) => {
  const response = await instance.post("login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await instance.post("register", data);
  return response.data;
};

export const logout = async () => {
  await instance.delete(
    "/logout",
    { data: { refreshToken: localStorage.getItem("refreshToken") } },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
};
