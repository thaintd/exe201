import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import ImageCarousel from "../components/Carousel/Carousel";
import { HomeCardCarousel } from "../components/HomeInfor/HomeInfo";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        console.log("Posts:", data?.data?.$values);
        setPosts(data?.data?.$values || []); // Assuming `data.data` contains the list of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filtering posts based on room type
  const nhaTroPosts = posts.filter((post) => post?.room?.type === "Nhà trọ");
  const nhaNguyenCanPosts = posts.filter((post) => post?.room?.type === "Nhà nguyên căn");
  const canHoPosts = posts.filter((post) => post?.room?.type === "Chung cư");

  return (
    <div>
      <ImageCarousel />
      <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
        Danh sách nhà trọ cho thuê
      </Typography>
      <HomeCardCarousel filteredPosts={nhaTroPosts} roomType={1} />

      <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
        Danh sách nhà nguyên căn cho thuê
      </Typography>
      <HomeCardCarousel filteredPosts={nhaNguyenCanPosts} roomType={2} />

      <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
        Danh sách căn hộ cho thuê
      </Typography>
      <HomeCardCarousel filteredPosts={canHoPosts} roomType={3} />
    </div>
  );
};

export default Home;
