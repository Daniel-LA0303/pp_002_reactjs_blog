import axios from "axios";

// public API client
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

export default apiClient;