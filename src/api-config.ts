import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://ender.onrender.com",
  headers: { "Content-Type": "application/json" },
});

apiConfig.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("login") && !config.url?.includes("register")) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${
          JSON.parse(localStorage.getItem("sms-cuba") ?? "{}").token
        }`;
      } else {
        config.headers = {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("sms-cuba") ?? "{}").token
          }`,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiConfig;
