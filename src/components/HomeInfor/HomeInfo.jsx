/* eslint-disable react/prop-types */
import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import formatCurrency from "../../services/format";

// eslint-disable-next-line react/prop-types
export const HomeCard = ({ title, details, price, image, onClick }) => {
  return (
    <Card sx={{ maxWidth: { xs: 340, sm: 300, md: 260 }, borderRadius: 4, boxShadow: 3, marginLeft: 1, marginRight: 1 }} onClick={onClick}>
      <CardMedia component="img" height="180" image={image} alt="Property Image" sx={{ borderRadius: "4px 4px 0 0" }} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", marginTop: 1, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: 2 }}>
          {details}
        </Typography>
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bold", marginTop: 1 }}>
          {formatCurrency(price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

// eslint-disable-next-line react/prop-types
export const HomeCardCarousel = ({ filteredPosts, roomType }) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  return (
    <div style={{ position: "relative" }}>
      <Slider {...settings}>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <HomeCard title={post.title} details={post.note} price={post?.room?.rentAmount} image={post.images?.$values[0]?.imageUrl} onClick={() => navigate(`/product-detail/${post.postId}`, { state: post })} />
          </div>
        ))}
      </Slider>
      <IconButton
        onClick={() => navigate(`/rooms/${roomType}`)} // Change this to your detailed view route
        sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};
