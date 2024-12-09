import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log(import.meta.env.VITE_API_URL); // Should log the correct API URL

export default api;
