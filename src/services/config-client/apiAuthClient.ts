import axios from "axios";

const apiAuthClient = axios.create({
  baseURL: "http://192.168.100.3:8080/api",
  timeout: 10000,
});


apiAuthClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiAuthClient;
