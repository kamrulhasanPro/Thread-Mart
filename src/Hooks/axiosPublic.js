import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:2000",
  withCredentials: true,
});
