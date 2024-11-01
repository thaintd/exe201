import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

const PaymentResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const status = queryParams.get("status");
  const cancel = queryParams.get("cancel") === "true";
  const orderCode = queryParams.get("orderCode");

  // Handle redirection if payment was canceled
  useEffect(() => {
    if (cancel) {
      navigate("/subscription");
    }
  }, [cancel, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #E3F2FD 30%, #BBDEFB 90%)"
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          boxShadow: 5,
          borderRadius: 3,
          p: 3
        }}
      >
        <CardContent>
          {status === "PAID" && code === "00" ? (
            <>
              <CheckCircle sx={{ fontSize: 80, color: "green", mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "green" }}>
                Thanh toán thành công!
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Mã đơn hàng: <strong>{orderCode}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 3 }}>
                Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi!
              </Typography>
              <Button variant="contained" color="success" size="large" sx={{ borderRadius: "25px", px: 4 }} onClick={() => navigate("/post")}>
                Về trang đăng bài
              </Button>
            </>
          ) : (
            <>
              <Error sx={{ fontSize: 80, color: "red", mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "red" }}>
                Thanh toán không thành công!
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 3 }}>
                Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
              </Typography>
              <Button variant="contained" color="error" size="large" sx={{ borderRadius: "25px", px: 4 }} onClick={() => navigate("/subscription")}>
                Quay lại trang mua gói
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentResultPage;
