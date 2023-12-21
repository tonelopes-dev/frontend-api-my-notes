import axios from "axios";

export const api = axios.create({
  baseURL: "https://myappnotes-api.onrender.com",
});
