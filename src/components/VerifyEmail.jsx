import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

export default function ConfirmEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`/api/Auth/verify-email/?token=${token}`);
        if (response.status === 200) {
          toast.success("Xác nhận email thành công! Bạn có thể đăng nhập ngay.");
          navigate("/login"); // Chuyển hướng đến trang đăng nhập
        }
      } catch (error) {
        toast.error("Xác nhận email thất bại. Vui lòng kiểm tra lại.");
        console.error("Error confirming email:", error);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return null;
}
