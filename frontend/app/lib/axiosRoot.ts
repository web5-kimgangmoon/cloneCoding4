import axios from "axios";

const axiosRoot = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: process.env.NEXT_PUBLIC_IS_WITH_CREDENTIALS === "true",
});

export default axiosRoot;
