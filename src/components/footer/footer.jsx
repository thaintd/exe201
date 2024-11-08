import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", p: 4, textAlign: "center", mt: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {/* Logo and Contact Section */}
        <Grid item xs={12} sm={6} md={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box component="img" src="https://res.cloudinary.com/dligpgeta/image/upload/v1726629565/Logo_3_fdgfyt.png" alt="Logo" sx={{ width: 100, mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Liên hệ: 037 306 1719
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, fontSize: "24px", mb: 2 }}>
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </Box>
          <Typography variant="body1">© 2025 Homee</Typography>
        </Grid>

        {/* About Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "left", mb: 1 }}>
            VỀ HOMEE
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <Typography variant="body1">Trang chủ</Typography>
            <Typography variant="body1">Về chúng tôi</Typography>
            <Typography variant="body1">Liên hệ</Typography>
          </Box>
        </Grid>

        {/* Customer Section */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "left", mb: 1 }}>
            KHÁCH HÀNG
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <Typography variant="body1">Blog</Typography>
            <Typography variant="body1">FAQ</Typography>
            <Typography variant="body1">Hỗ trợ</Typography>
          </Box>
        </Grid>

        {/* Policy Section */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "left", mb: 1 }}>
            QUY ĐỊNH
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <Typography variant="body1">Chính sách bảo mật</Typography>
            <Typography variant="body1">Điều khoản sử dụng</Typography>
          </Box>
        </Grid>

        {/* Newsletter Subscription Section */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "left", mb: 1, color: "#f2f0f2" }}>
            ĐĂNG KÝ NHẬN TIN
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
            <TextField
              placeholder="Nhập Email của bạn"
              variant="outlined"
              sx={{
                backgroundColor: "#f2f0f2",
                borderRadius: "6px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent"
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff"
                  }
                }
              }}
              InputProps={{
                sx: { py: 1, px: 2, fontSize: "0.9rem" }
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ffffff",
                color: "#db6f16",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "6px",
                textTransform: "uppercase",
                py: 1,
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#e0e0e0"
                }
              }}
            >
              Đăng ký
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
