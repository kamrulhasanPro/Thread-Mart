import axios from "axios";
import { toast } from "react-toastify";

const axiosPublic = axios.create({
  baseURL: "http://localhost:2000",
  withCredentials: true,
});

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("Unauthorized or Forbidden");
      toast.error(
        error?.response?.data?.message ||
          "You are forbidden user. Not access for you."
      );
    }
    return Promise.reject(error);
  }
);

export { axiosPublic };
