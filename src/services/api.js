import axios from "axios";

console.log("Vite API URL (raw):", import.meta.env.VITE_API_URL);

let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
if (baseURL && !baseURL.endsWith("/api") && !baseURL.endsWith("/api/")) {
  baseURL = baseURL.endsWith("/") ? `${baseURL}api` : `${baseURL}/api`;
}
console.log("Vite API URL (resolved):", baseURL);

const API = axios.create({
  baseURL,
});

// Add interceptor to include token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;