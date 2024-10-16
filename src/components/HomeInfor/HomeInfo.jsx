import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services/postService";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const HomeCard = ({ title, details, price, image, onClick }) => {
  return (
    <Card sx={{ maxWidth: { xs: 340, sm: 300, md: 260 }, borderRadius: 4, boxShadow: 3, marginLeft: 1, marginRight: 1 }} onClick={onClick}>
      <CardMedia component="img" height="180" image={image} alt="Property Image" sx={{ borderRadius: "4px 4px 0 0" }} />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", marginTop: 1 }}>
          {details}
        </Typography>
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bold", marginTop: 1 }}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

const HomeCardCarousel = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data?.data?.$values || []); // Giả sử `data.data` chứa danh sách bài đăng
        console.log("Posts:", data.data.$values);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Slider {...settings}>
      {posts.map((post) => (
        <div key={post.id}>
          <HomeCard title={post.title} details={post.note} price={post?.room?.rentAmount} image={post.images?.$values[0]?.imageUrl} onClick={() => navigate(`/product-detail/${post.postId}`, { state: post })} />
        </div>
      ))}
    </Slider>
  );
};

export default HomeCardCarousel;
