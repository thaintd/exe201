import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://homeapi-bdgnejbgcfbcb2b7.southeastasia-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
    "Content-Encoding": "gzip",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0"
  }
});

export default axiosInstance;
