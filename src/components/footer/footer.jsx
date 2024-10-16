import { Box, Typography, Grid, TextField, Button } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", p: 4, textAlign: "center", marginTop: 2 }}>
      <Grid container spacing={2} sx={{ ml: 2 }}>
        <Grid item xs={12} sm={6} md={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
          <Box component="img" src="https://res.cloudinary.com/dligpgeta/image/upload/v1726629565/Logo_3_fdgfyt.png" alt="Logo" sx={{ width: 100, mb: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            Liên hệ: 0123456789
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", fontSize: "24px", mb: 2 }}>
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            © 2025 Homee
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            VỀ HOMEE
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Trang chủ
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Về chúng tôi
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Liên hệ
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h3" fontWeight={"bold"}>
            KHÁCH HÀNG
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Blog
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              FAQ
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Hỗ trợ
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="h3" fontWeight={"bold"}>
            QUY ĐỊNH
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Chính sách bảo mật
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Điều khoản sử dụng
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="h3" fontWeight={"bold"}>
            ĐĂNG KÝ NHẬN TIN
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <TextField placeholder="Nhập Email của bạn" sx={{ backgroundColor: "#f2f0f2", borderStyle: "none", mb: 1 }} />
            <Button sx={{ backgroundColor: "#fff", fontSize: "20px", fontWeight: "bold" }}>ĐĂNG KÍ</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
