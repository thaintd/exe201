import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { getAllPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const { roomType } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data?.data?.$values || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const roomTypeMap = {
    1: "Nhà trọ",
    2: "Nhà nguyên căn",
    3: "Chung cư"
  };

  const filteredPosts = posts.filter((post) => post?.room?.type === roomTypeMap[roomType]);
  console.log("Filtered posts:", filteredPosts);

  const formatPrice = (price) => {
    return price ? `${(price / 1000000).toFixed(1)} triệu` : "N/A";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
        Danh sách {roomTypeMap[roomType]} cho thuê
      </Typography>
      {filteredPosts.map((post) => (
        <Card sx={{ display: "flex", marginBottom: 2 }} key={post.id} onClick={() => navigate(`/product-detail/${post.postId}`)}>
          <CardMedia component="img" sx={{ width: 160 }} image={post.images?.$values[0]?.imageUrl || "default-image-url.jpg"} alt={post.title} />
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${post.room.area} m²`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Nội thất: ${post.room.interiorStatus}`}
              </Typography>
              <Typography variant="body1" color="primary" sx={{ fontWeight: "bold" }}>
                {formatPrice(post.room.rentAmount)}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default RoomList;
