import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/refresh-token";

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("refreshToken");
    const response = await axios.post(`${API_URL}/generate-token`, {
      token,
    });

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    return error;
  }
};
