// src/pages/Home.jsx
import React from "react";
import { Box, Typography, Button, Grid, Card, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Search, Phone, AddCircle, ManageAccounts, ExpandMore } from "@mui/icons-material";
import SubscriptionPage from "./SubscriptionPage";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: "#e3f2fd", p: 6, textAlign: "center", color: "#333" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: "2.5rem" }}>
          Kết nối chủ nhà và người thuê trọ nhanh chóng
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontSize: "1.2rem" }}>
          Nền tảng giúp bạn tìm phòng, liên hệ dễ dàng và quản lý phòng trọ chuyên nghiệp.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")} size="large" sx={{ mt: 4 }}>
          Bắt đầu ngay
        </Button>
      </Box>

      {/* About Section */}
      <Grid container spacing={4} sx={{ p: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Giới thiệu về nền tảng
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "1rem" }}>
            Nền tảng của chúng tôi giúp kết nối nhanh chóng giữa chủ nhà và người thuê trọ. Với giao diện đơn giản và dễ sử dụng, bạn có thể dễ dàng tìm kiếm phòng trọ phù hợp, liên hệ trực tiếp với chủ nhà, và quản lý các hợp đồng thuê một cách hiệu quả.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="https://res.cloudinary.com/dgkth0wxx/image/upload/v1728835586/home_lx7ndu.jpg" alt="Illustration" style={{ width: "100%", borderRadius: "8px" }} />
        </Grid>
      </Grid>

      {/* Key Features Section */}
      <Box sx={{ p: 6, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Tính năng nổi bật
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ textAlign: "center", p: 3 }}>
              <Search sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2, fontSize: "1.1rem" }}>
                Tìm kiếm phòng trọ
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Tìm kiếm phòng trọ phù hợp theo vị trí, giá cả, và tiện ích chỉ với vài cú click.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ textAlign: "center", p: 3 }}>
              <Phone sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2, fontSize: "1.1rem" }}>
                Liên hệ trực tiếp
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Liên hệ với chủ nhà dễ dàng để trao đổi thông tin và đặt lịch hẹn.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ textAlign: "center", p: 3 }}>
              <AddCircle sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2, fontSize: "1.1rem" }}>
                Đăng tin phòng trọ
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Chủ nhà có thể đăng tin cho thuê với hình ảnh và thông tin chi tiết, dễ dàng quản lý.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ textAlign: "center", p: 3 }}>
              <ManageAccounts sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2, fontSize: "1.1rem" }}>
                Quản lý phòng trọ
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Công cụ quản lý cho chủ nhà giúp bạn dễ dàng theo dõi hợp đồng, phòng trống và khách thuê.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Service Plans Section */}
      <Box sx={{ p: 6 }}>
        <SubscriptionPage />
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ p: 6, backgroundColor: "#f9f9f9", textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Khách hàng nói gì về chúng tôi?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              "Tôi tìm được phòng trọ hoàn hảo chỉ sau vài ngày! Nền tảng rất dễ sử dụng."
            </Typography>
            <Typography variant="subtitle2" sx={{ fontStyle: "italic", fontSize: "0.9rem" }}>
              - Nguyễn Văn A
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              "Dịch vụ khách hàng rất tốt, hỗ trợ nhanh chóng và hiệu quả."
            </Typography>
            <Typography variant="subtitle2" sx={{ fontStyle: "italic", fontSize: "0.9rem" }}>
              - Trần Thị B
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              "Nền tảng giúp tôi quản lý phòng trọ dễ dàng hơn bao giờ hết!"
            </Typography>
            <Typography variant="subtitle2" sx={{ fontStyle: "italic", fontSize: "0.9rem" }}>
              - Lê Văn C
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Tips for Students Section */}
      <Box sx={{ p: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Lời khuyên cho sinh viên khi thuê nhà
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              1. <strong>Xác định ngân sách</strong>: Trước khi tìm kiếm, hãy xác định ngân sách của bạn và tìm kiếm các lựa chọn trong khoảng ngân sách đó.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              2. <strong>Kiểm tra hợp đồng thuê</strong>: Đọc kỹ hợp đồng thuê trước khi ký. Đảm bảo rằng bạn hiểu tất cả các điều khoản.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              3. <strong>Tìm hiểu về khu vực</strong>: Nên tìm hiểu về khu vực bạn định thuê, bao gồm giao thông, tiện ích, và an ninh.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              4. <strong>Tham khảo ý kiến từ bạn bè</strong>: Nếu có bạn bè hoặc người quen đã thuê nhà ở khu vực đó, hãy hỏi họ để nhận được lời khuyên.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              5. <strong>Kiểm tra phòng trước khi thuê</strong>: Hãy chắc chắn rằng bạn đã xem phòng và kiểm tra tình trạng của nó trước khi quyết định thuê.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              6. <strong>Thương lượng giá cả</strong>: Đừng ngần ngại thương lượng giá cả với chủ nhà. Có thể bạn sẽ có được giá tốt hơn.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              7. <strong>Đảm bảo giấy tờ đầy đủ</strong>: Khi hoàn tất thuê, hãy đảm bảo bạn có đủ giấy tờ cần thiết để tránh rắc rối sau này.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
              8. <strong>Đánh giá phản hồi của người thuê trước</strong>: Hãy xem xét đánh giá từ người thuê trước để hiểu rõ hơn về chủ nhà và phòng trọ.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ p: 6, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Câu hỏi thường gặp
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Làm thế nào để đăng ký tài khoản?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Để đăng ký tài khoản, bạn chỉ cần nhấn vào nút "Đăng ký" trên trang chủ và điền thông tin cần thiết.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Tôi có thể tìm kiếm phòng trọ theo tiêu chí nào?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Bạn có thể tìm kiếm phòng trọ theo vị trí, giá cả, tiện ích, và diện tích.</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Làm thế nào để liên hệ với chủ nhà?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Sau khi tìm thấy phòng trọ, bạn có thể nhấn vào nút "Liên hệ" để gửi tin nhắn cho chủ nhà.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Section */}
      <Box sx={{ p: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Liên hệ với chúng tôi
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
          Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua:
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
          Email: homee@gmail.com
        </Typography>
        <Typography variant="body1" textAlign="center">
          Điện thoại: 037 306 1719
        </Typography>
      </Box>
    </Box>
  );
};

export default Intro;
