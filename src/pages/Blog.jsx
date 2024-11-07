import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed"; // Replace with actual icons if needed

function Blog() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Grid container spacing={4}>
          <Typography variant="h4" component="h1" textAlign="left" sx={{ color: "#F58220", fontWeight: "bold", mb: 2, mt: 2 }}>
            Tìm phòng trọ sinh viên Sài Gòn: Đơn giản, nhanh chóng và tiết kiệm cùng Homeee
          </Typography>
          {/* Left Side: Text Content */}
          <Grid container spacing={4} alignItems="stretch">
            {/* Left Side: Text Content */}
            <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h2" textAlign="left" sx={{ color: "#333", lineHeight: 1.6 }}>
                Bạn là sinh viên mới vào Sài Gòn và đang loay hoay tìm một căn phòng trọ ưng ý? Đừng lo lắng, Homeee sẽ giúp bạn giải quyết vấn đề này một cách dễ dàng!
              </Typography>
            </Grid>

            {/* Right Side: Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://res.cloudinary.com/dligpgeta/image/upload/v1730991153/image_7_ig7gqn.png"
                alt="Room example"
                sx={{
                  width: "100%",
                  height: "100%", // Ensures the image fills the container's height
                  borderRadius: 2,
                  objectFit: "cover" // Maintains image proportions
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Why Choose Us Section */}
      <Typography variant="h5" gutterBottom>
        Tại sao nên chọn Homeee?
      </Typography>
      <ul>
        <li>Không qua môi giới: Tiết kiệm chi phí và thời gian, bạn sẽ được cập nhật trực tiếp từ danh sách chất lượng trên các sàn của Homeee.</li>
        <li>Đa dạng thông tin: Từ vị trí, mức giá, đến các tiện nghi, chúng tôi đảm bảo cung cấp cho bạn đủ thông tin cần thiết.</li>
        <li>Thương hiệu uy tín: Với nhiều năm kinh nghiệm, chúng tôi luôn nỗ lực đem lại sự hài lòng cao nhất cho khách hàng.</li>
        <li>Dễ dàng tìm kiếm: Chỉ cần vài cú click, bạn đã có thể xem nhiều phòng trọ ở vị trí bạn muốn.</li>
        <li>Cộng đồng sinh viên sôi nổi: Tham gia vào Homeee bạn có cơ hội kết nối với các sinh viên khác để tìm bạn cùng phòng.</li>
      </ul>

      {/* Room Image */}
      <Box sx={{ my: 4 }}>
        <img src="path_to_your_placeholder_image.jpg" alt="Room example" style={{ width: "100%", borderRadius: 8 }} />
      </Box>

      {/* Tips for Finding a Room Section */}
      <Typography variant="h5" gutterBottom>
        Mẹo tìm phòng cho sinh viên
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <BedIcon fontSize="large" color="primary" />
            <Typography variant="h6" gutterBottom>
              Xác định nhu cầu về giá cả
            </Typography>
            <Typography variant="body2">Xác định ngân sách của bạn sẽ giúp thu hẹp lựa chọn của bạn.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <BedIcon fontSize="large" color="primary" />
            <Typography variant="h6" gutterBottom>
              Tìm hiểu về giá cả
            </Typography>
            <Typography variant="body2">Nghiên cứu mức giá thị trường để có lựa chọn tốt nhất.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <BedIcon fontSize="large" color="primary" />
            <Typography variant="h6" gutterBottom>
              Đọc kỹ hợp đồng trước khi thuê
            </Typography>
            <Typography variant="body2">Hãy chắc chắn rằng bạn hiểu rõ các điều khoản hợp đồng.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Blog;
