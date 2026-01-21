import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsearch.p.rapidapi.com",
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["x-rapidapi-key"] = import.meta.env.VITE_RAPID_API_KEY;
  console.log("API KEY:", import.meta.env.VITE_RAPID_API_KEY);

  config.headers["x-rapidapi-host"] = "jsearch.p.rapidapi.com";
  return config;
});


export default axiosInstance;
