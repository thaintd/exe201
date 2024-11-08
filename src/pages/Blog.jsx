import { Container, Typography, Grid, Box } from "@mui/material";

function Blog() {
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" textAlign="left" sx={{ color: "#F58220", fontWeight: "bold", mb: 2, mt: 2 }}>
          Tìm phòng trọ sinh viên Sài Gòn: Đơn giản, nhanh chóng và tiết kiệm cùng Homeee
        </Typography>
        <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }}>
          <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h2" textAlign="left" sx={{ color: "#333", lineHeight: 1.6 }}>
              Bạn là sinh viên mới vào Sài Gòn và đang loay hoay tìm một căn phòng trọ ưng ý? Đừng lo lắng, Homeee sẽ giúp bạn giải quyết vấn đề này một cách dễ dàng!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dligpgeta/image/upload/v1730991153/image_7_ig7gqn.png"
              alt="Room example"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                objectFit: "cover"
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ mt: 8, mb: 5 }}>
        Tại sao nên chọn Homeee?
      </Typography>
      <ul>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Không qua môi giới:
            </Typography>{" "}
            Tiết kiệm chi phí và thời gian, bạn sẽ được cập nhật trực tiếp từ danh sách chất lượng trên các sàn của Homeee.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Đa dạng thông tin:
            </Typography>{" "}
            Từ vị trí, mức giá, đến các tiện nghi, chúng tôi đảm bảo cung cấp cho bạn đủ thông tin cần thiết.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Thương hiệu uy tín:
            </Typography>{" "}
            Với nhiều năm kinh nghiệm, chúng tôi luôn nỗ lực đem lại sự hài lòng cao nhất cho khách hàng.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Dễ dàng tìm kiếm:
            </Typography>{" "}
            Chỉ cần vài cú click, bạn đã có thể xem nhiều phòng trọ ở vị trí bạn muốn.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Cộng đồng sinh viên sôi nổi:
            </Typography>{" "}
            Tham gia vào Homeee bạn có cơ hội kết nối với các sinh viên khác để tìm bạn cùng phòng.
          </Typography>
        </li>
      </ul>
      <Box sx={{ my: 4 }}>
        <img src="https://res.cloudinary.com/dligpgeta/image/upload/v1731037634/image_6_wcbhsd.png" alt="Room example" style={{ width: "100%", borderRadius: 8 }} />
      </Box>
      {/* Tips for Finding a Room Section */}
      <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ mb: 5 }}>
        Mẹo tìm phòng cho sinh viên
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dligpgeta/image/upload/v1731037882/image_10_cfdglj.png"
            alt="Tip 1"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dligpgeta/image/upload/v1731037876/image_8_urcfgc.png"
            alt="Tip 2"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dligpgeta/image/upload/v1731037871/image_11_aggfov.png"
            alt="Tip 3"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dligpgeta/image/upload/v1731037861/image_9_slpys9.png"
            alt="Tip 4"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover"
            }}
          />
        </Grid>
      </Grid>
      <ul>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Xác định khu vực:
            </Typography>{" "}
            Chọn khu vực gần trường, chợ, hoặc các tiện ích khác mà bạn cần.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Lựa chọn loại hình phòng trọ:
            </Typography>{" "}
            Phòng trọ đơn, phòng trọ chung hay căn hộ mini? Mỗi loại hình đều có ưu điểm riêng.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              So sánh giá cả:
            </Typography>{" "}
            So sánh giá cả của nhiều phòng trọ khác nhau để tìm được mức giá phù hợp nhất.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Xem phòng trực tiếp:
            </Typography>{" "}
            Luôn nhớ xem phòng trực tiếp trước khi quyết định thuê để đảm bảo phòng trọ đáp ứng đầy đủ nhu cầu của bạn.
          </Typography>
        </li>
        <li>
          <Typography sx={{ fontSize: "1.2rem", mt: 2, mb: 2 }}>
            <Typography component="span" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Đọc kỹ hợp đồng:
            </Typography>{" "}
            Đọc kỹ hợp đồng trước khi ký để tránh những rắc rối sau này.
          </Typography>
        </li>
      </ul>
    </Container>
  );
}

export default Blog;
