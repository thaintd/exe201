import Slider from "react-slick";
import { Card, CardMedia } from "@mui/material";
import "./carousel.scss";

const imageSlides = [{ url: "https://res.cloudinary.com/dligpgeta/image/upload/v1726629670/Slider_1_1_lvf7cf.png" }, { url: "https://res.cloudinary.com/dligpgeta/image/upload/v1728437810/Property_1_image_3_bnge2s.png" }, { url: "https://res.cloudinary.com/dligpgeta/image/upload/v1728437864/Property_1_image_1_ewcare.png" }];

const ImageCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable/disable arrows
    autoplay: true, // Enable/disable autoplay
    autoplaySpeed: 1000 // Autoplay speed in milliseconds
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imageSlides.map((slide, index) => (
          <div key={index}>
            <Card>
              <CardMedia component="img" height="400" image={slide.url} alt={`Slide ${index + 1}`} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
