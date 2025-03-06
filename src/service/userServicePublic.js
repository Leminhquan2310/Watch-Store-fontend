import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/user";

const instance = axios.create({
  baseURL: API_URL,
});
