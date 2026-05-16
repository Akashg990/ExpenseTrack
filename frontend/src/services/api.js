import axios from "axios";

const api = axios.create({
  baseURL: "https://fintrack-hsb3.onrender.com/api",
});

export default api;
