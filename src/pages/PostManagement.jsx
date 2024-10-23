import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, TextField, MenuItem, IconButton, Menu } from "@mui/material";
import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";
import { getUserId } from "../services/auth";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatCurrency from "../services/format";
function PostsManagement() {
  const [posts, setPosts] = useState([]);
  const [rooms, setRooms] = useState([]); // State for available rooms
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false); // State for opening the Add Post modal
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading posts
  const [deleting, setDeleting] = useState(false); // State for loading delete operation
  const [adding, setAdding] = useState(false); // State for loading add operation
  const [newPostTitle, setNewPostTitle] = useState(""); // State for new post title
  const [newPostNote, setNewPostNote] = useState(""); // State for new post note
  const [selectedRoomId, setSelectedRoomId] = useState(""); // State for selected room
  const [imageUrls, setImageUrls] = useState([]); // State for image URLs
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId); // Store the selected post ID
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Fetch posts and available rooms on component mount
  useEffect(() => {
    const fetchPostsAndRooms = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch rooms and places in parallel
        const [roomsResponse, placesResponse, postsResponse] = await Promise.all([
          axiosInstance.get("/api/Room/AllRooms"),
          axiosInstance.get("/api/Place/GetAll"),
          axiosInstance.get("/api/Post/GetAll") // Fetch all posts
        ]);

        const currentUserId = getUserId();

        // Filter rooms belonging to the current user based on `ownerId`
        const addressesData = placesResponse?.data?.data?.$values?.filter((address) => String(address.ownerId) === String(currentUserId)).map((address) => address.placeId);

        const userRooms = roomsResponse?.data?.data?.$values?.filter((room) => addressesData.includes(room.placeId));
        setRooms(userRooms); // Only store the user's rooms

        // Filter posts belonging to the current user
        console.log("Danh sách bài đăng:", postsResponse.data.data.$values);
        const userPosts = postsResponse?.data?.data?.$values?.filter((post) => String(post.room.place.ownerId) === String(currentUserId));
        console.log("Bài đăng của người dùng:", userPosts);
        setPosts(userPosts); // Only store the user's posts
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPostsAndRooms();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    setSelectedPostId(postId);
    setOpenDeleteDialog(true); // Open confirmation dialog
  };

  const confirmDelete = async () => {
    setDeleting(true); // Start loading for delete operation
    try {
      await axiosInstance.delete(`/api/Post/Delete/${selectedPostId}`); // Replace with the actual delete endpoint
      setPosts(posts.filter((post) => post.postId !== selectedPostId)); // Remove the deleted post from the state
      setOpenDeleteDialog(false); // Close dialog after deletion
      setSelectedPostId(null); // Reset selected post ID
    } catch (error) {
      console.error("Lỗi khi xóa bài đăng:", error);
    } finally {
      setDeleting(false); // Stop loading
    }
  };

  const handleViewDetails = (post) => {
    navigate(`/product-detail/${post.postId}`);
  };

  const handleAddPost = async () => {
    setAdding(true);
    try {
      const newPost = {
        title: newPostTitle,
        note: newPostNote,
        roomId: selectedRoomId,
        postedDate: new Date().toISOString(), // Current timestamp
        status: 1,
        imageUrls: imageUrls.map((url, index) => ({ imageUrl: url, no: index })) // Constructing imageUrls array
      };

      const response = await axiosInstance.post("/api/Post/CreateBaseOnRoom", newPost);
      setPosts([...posts, response.data]);
      setOpenAddPostDialog(false);
      setNewPostTitle("");
      setNewPostNote("");
      setSelectedRoomId("");
      setImageUrls([]);
    } catch (error) {
      console.error("Lỗi khi thêm bài đăng:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleImageUpload = (urls) => {
    setImageUrls(urls); // Assuming `urls` is an array of uploaded image URLs
  };

  const handleOpenAddPostDialog = () => {
    setOpenAddPostDialog(true);
  };

  const handleCloseAddPostDialog = () => {
    setOpenAddPostDialog(false);
  };
  console.log("Danh sách bài đăng:", posts);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4">Quản lý bài đăng</Typography>

      {/* New Post Button */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleOpenAddPostDialog} sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
          Thêm Bài Đăng
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} md={12} lg={12} key={post.postId}>
              <Card sx={{ position: "relative", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "row", alignItems: "center" }}>
                {/* Display image */}
                {post && <CardMedia component="img" sx={{ width: 100, height: 100, objectFit: "cover" }} image={post?.images?.$values[0]?.imageUrl || "default_image_url_here"} alt={post.title} />}

                {/* Post content */}
                <CardContent sx={{ flex: "1 0 auto", paddingLeft: 2 }}>
                  {/* Title and description */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                    Mã tin: {post.postId} | Ngày đăng: {new Date(post.postedDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                    Địa chỉ: {post?.room?.place?.number}-{post?.room?.place?.street}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                    Tên phòng: {post?.room?.roomName}
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#2ecc71", fontWeight: "bold" }}>
                    {formatCurrency(post.room?.rentAmount)}
                  </Typography>
                </CardContent>

                {/* Menu icon and actions */}
                <IconButton onClick={(event) => handleMenuOpen(event, post.postId)} sx={{ paddingRight: 2 }}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem>Chỉnh sửa</MenuItem>
                  <MenuItem onClick={handleDelete}>Xóa</MenuItem>
                  <MenuItem onClick={() => navigate(`/product-detail/${post.postId}`)}>Xem chi tiết</MenuItem>
                </Menu>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Post Modal */}
      <Dialog open={openAddPostDialog} onClose={handleCloseAddPostDialog}>
        <DialogTitle>Thêm Bài Đăng</DialogTitle>
        <DialogContent>
          <TextField label="Tiêu đề" fullWidth variant="outlined" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} margin="normal" />
          <TextField label="Ghi chú" fullWidth variant="outlined" multiline rows={4} value={newPostNote} onChange={(e) => setNewPostNote(e.target.value)} margin="normal" />
          <TextField select label="Chọn Phòng" fullWidth variant="outlined" value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)} margin="normal">
            {rooms.map((room) => (
              <MenuItem key={room.roomId} value={room.roomId}>
                {room.roomName}
              </MenuItem>
            ))}
          </TextField>

          {/* Thay thế bằng component ImageUpload */}
          <ImageUpload onUpload={handleImageUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPostDialog}>Hủy</Button>
          <Button onClick={handleAddPost} disabled={adding}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Xóa Bài Đăng</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa bài đăng này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button onClick={confirmDelete} disabled={deleting}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostsManagement;
