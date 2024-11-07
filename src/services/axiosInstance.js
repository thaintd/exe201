import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://homeapi-bdgnejbgcfbcb2b7.southeastasia-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
    "Content-Encoding": "gzip",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0"
  }
});

// Sử dụng interceptor để thêm token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
