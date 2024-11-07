import { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, CardActions, Snackbar, Avatar, Box, CircularProgress } from "@mui/material";
import { Star, CheckCircle, SupportAgent } from "@mui/icons-material";
import axiosInstance from "../services/axiosInstance";

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
    duration: "3 tháng",
    benefits: [
      { text: "Truy cập nâng cao", icon: <Star /> },
      { text: "Hỗ trợ 24/7", icon: <SupportAgent /> }
    ]
  },
  {
    name: "Premium",
    price: "600,000 VND",
    duration: "1 năm",
    benefits: [
      { text: "Truy cập đầy đủ", icon: <Star /> },
      { text: "Hỗ trợ 24/7", icon: <SupportAgent /> },
      { text: "Tính năng đặc biệt", icon: <CheckCircle /> }
    ]
  }
];

const SubscriptionPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuySinglePost = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/Order/Posting");
      console.log(response.data);
      if (response.data.status === 1) {
        window.location.href = response.data.data;
      }
    } catch (error) {
      console.log("Error purchasing single post:", error);
      setMessage("Có lỗi xảy ra, vui lòng thử lại!");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "15px",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" }
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
                <Button variant="contained" color="primary" size="large" sx={{ borderRadius: "25px", px: 4 }}>
                  Mua {pkg.name}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" size="large" sx={{ mt: 3, px: 4 }} onClick={handleBuySinglePost} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Mua 1 bài đăng - 20,000 VND"}
          </Button>
        </Grid>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={message} />
      </Grid>
    </Box>
  );
};

export default SubscriptionPage;
