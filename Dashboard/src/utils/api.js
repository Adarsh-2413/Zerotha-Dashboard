import axios from "axios";

// Shared axios instance for all Dashboard → Backend calls.
// withCredentials: true ensures the session cookie is sent automatically.
const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

export default api;
