import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers.authorization = `Bearer ${storedToken}`;
  }
  config.headers["Cache-Control"] = "no-cache";

  return config;
});

export default service;
