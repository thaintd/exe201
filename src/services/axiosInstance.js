import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://homeapi-bdgnejbgcfbcb2b7.southeastasia-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
    "Content-Encoding": "gzip",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export default axiosInstance;
