import { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (files) => {
    const uploadedImages = [];

    // Iterate over files and upload each one
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "ml_default");
      setLoading(true);

      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dgkth0wxx/image/upload", data);
        uploadedImages.push(res.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }

    // Set the images after all uploads are complete
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
    onUpload(uploadedImages); // Pass the array of image URLs to the parent component
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 10) {
      alert("You can upload a maximum of 10 images");
    } else {
      uploadImage(files);
    }
  };

  return (
    <CloudinaryContext cloudName="dgkth0wxx">
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Box mt={2}>
            <Typography variant="h6">Uploaded Images:</Typography>
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Image
                    publicId={image}
                    width="150" // Đặt chiều rộng nhỏ hơn
                    height="100" // Đặt chiều cao (tuỳ chọn)
                    crop="scale"
                    style={{ borderRadius: "8px", objectFit: "cover" }} // Để cải thiện giao diện
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
    </CloudinaryContext>
  );
};

export default ImageUpload;
