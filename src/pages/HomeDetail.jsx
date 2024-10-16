import { Grid, Box, Typography, Button, Divider } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import DirectionIcon from "@mui/icons-material/Explore"; // Icon for direction
import InteriorIcon from "@mui/icons-material/Weekend"; // Icon for interior status
import CategoryIcon from "@mui/icons-material/Category"; // Icon for type
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icon for fees
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [post, setPost] = useState({});
  const postId = useParams().postId;

  const fetchPostDetail = async () => {
    const response = await axiosInstance.get(`api/Post/GetById/${postId}`);
    console.log("Post detail:", response.data.data);
    setPost(response.data.data);
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const images = post?.images?.$values.map((img) => ({
    original: img.imageUrl + "?q_auto:best&w_1000",
    thumbnail: img.imageUrl + "?w_150"
  }));

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ImageGallery items={images || []} showThumbnails={true} showPlayButton={false} showNav={false} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img src={post?.room?.place?.owner?.imageUrl} alt="User avatar" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              {post?.room?.place?.owner?.name || "N/A"}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                textTransform: "none"
              }}
            >
              <PhoneIcon sx={{ marginRight: 1 }} />
              0373 061 ***
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                textTransform: "none"
              }}
            >
              <ChatIcon sx={{ marginRight: 1 }} />
              Nhắn tin
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h2" sx={{ color: "#ff6f00", fontWeight: "bold" }}>
          {post.title || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          Địa chỉ: {`${post?.room?.place?.number || ""} ${post?.room?.place?.street || ""}, ${post?.room?.place?.ward || ""}, ${post?.room?.place?.distinct || ""}, ${post?.room?.place?.province || ""}`}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
          Ngày đăng: {new Date(post?.postedDate).toLocaleDateString() || "N/A"}
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={3}>
          <Typography>Mức giá</Typography>
          <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.rentAmount ? `${post.room.rentAmount} VND/tháng` : "N/A"}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Diện tích</Typography>
          <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.area ? `${post.room.area} m²` : "N/A"}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Phòng ngủ</Typography>
          <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>1 phòng</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Phòng vệ sinh</Typography>
          <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>1 phòng</Typography>
        </Grid>
      </Grid>

      <Box>
        <Typography variant="h4" color="black" fontWeight="bold">
          Thông tin mô tả
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {post?.note || "Không có thông tin mô tả."}
        </Typography>
      </Box>

      {/* Thông tin bổ sung */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" color="black" fontWeight="bold">
          Thông tin bổ sung
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={3}>
            <Typography>
              <DirectionIcon /> Hướng
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.direction || "N/A"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <InteriorIcon /> Tình trạng nội thất
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.interiorStatus || "N/A"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <CategoryIcon /> Loại hình
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.type || "N/A"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <AttachMoneyIcon /> Tiền điện
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.electricAmount ? `${post.room.electricAmount} VND/kWh` : "N/A"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <AttachMoneyIcon /> Tiền nước
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.waterAmount ? `${post.room.waterAmount} VND/m³` : "N/A"}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <AttachMoneyIcon /> Phí dịch vụ
            </Typography>
            <Typography sx={{ color: "#ff6f00", fontWeight: "bold" }}>{post?.room?.serviceAmount ? `${post.room.serviceAmount} VND` : "N/A"}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetail;
