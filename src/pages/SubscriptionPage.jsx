import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, CardActions, Snackbar, Avatar, Box } from "@mui/material";
import { Star, CheckCircle, SupportAgent, Adb } from "@mui/icons-material";
import axios from "axios";

const packages = [
  {
    name: "Thường",
    price: "100,000 VND",
    duration: "1 tháng",
    benefits: [
      { text: "Truy cập cơ bản", icon: <CheckCircle /> },
      { text: "Hỗ trợ khách hàng", icon: <SupportAgent /> }
    ]
  },
  {
    name: "VIP",
    price: "300,000 VND",
    duration: "1 tháng",
    benefits: [
      { text: "Truy cập nâng cao", icon: <Star /> },
      { text: "Hỗ trợ 24/7", icon: <SupportAgent /> },
      { text: "Không quảng cáo", icon: <Adb /> }
    ]
  },
  {
    name: "Premium",
    price: "500,000 VND",
    duration: "1 tháng",
    benefits: [
      { text: "Truy cập đầy đủ", icon: <Star /> },
      { text: "Hỗ trợ 24/7", icon: <SupportAgent /> },
      { text: "Không quảng cáo", icon: <Adb /> },
      { text: "Tính năng đặc biệt", icon: <CheckCircle /> }
    ]
  }
];

const SubscriptionPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlePurchase = async (packageName) => {
    try {
      const response = await axios.post("/api/purchase", { packageName });
      console.log("Thanh toán thành công:", response.data);
      setSnackbarMessage(`Bạn đã mua gói ${packageName} thành công!`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      setSnackbarMessage(`Thanh toán gói ${packageName} thất bại.`);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Chọn gói dịch vụ phù hợp với bạn
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Nâng cấp để trải nghiệm các tính năng cao cấp và hỗ trợ tốt nhất!
      </Typography>
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={4} key={pkg.name}>
            <Card
              sx={{
                p: 2,
                height: "100%", // Đảm bảo các thẻ có cùng chiều cao
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "15px",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)"
                }
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "primary.main",
                    mx: "auto",
                    mb: 2
                  }}
                >
                  {pkg.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {pkg.name}
                </Typography>
                <Typography variant="h6">{pkg.price}</Typography>
                <Typography variant="body1">Thời hạn: {pkg.duration}</Typography>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
                  {pkg.benefits.map((benefit, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                      {benefit.icon}
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {benefit.text}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mt: 2 }}>
                <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "25px", px: 4 }} onClick={() => handlePurchase(pkg.name)}>
                  Mua {pkg.name}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Snackbar open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} autoHideDuration={3000} />
      </Grid>
    </Box>
  );
};

export default SubscriptionPage;
