import axios from "axios";
import { store } from "../redux/store"; // Importa el store de Redux

const apiAuthClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Interceptor para agregar el Bearer Token automáticamente
apiAuthClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiAuthClient;
