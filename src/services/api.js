import axios from "axios";

const API = axios.create({
  baseURL:
    "https://pcp-fa-backend-hkdu.onrender.com/api",
});

export default API;