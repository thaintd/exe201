import { useEffect, useState } from "react";
import { Drawer, List, ListItem, Box, Avatar, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import RoomManagement from "./RoomManagement ";
import PostsManagement from "./PostManagement";
import { getUserProfile } from "../services/accountService";
import { getUserId } from "../services/auth";

function Owner() {
  const [selectedTab, setSelectedTab] = useState("Phòng");
  const userId = getUserId();
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    getUserProfile({ userId }).then((res) => {
      console.log("User profile:", res.result.data);
      setName(res.result.data.name);
    });
  }, [userId]);

  return (
    <Box sx={{ display: "flex", bgcolor: "#f9f9f9", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{ width: 180, flexShrink: 0, bgcolor: "#f9f9f9" }}
        PaperProps={{ sx: { width: 180, bgcolor: "#f9f9f9" } }} // Apply consistent background color
      >
        <Box
          sx={{
            width: 180,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "#325F96" // Consistent background color
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              bgcolor: "#325F96",
              color: "#fff"
            }}
          >
            <Avatar alt="User Avatar" sx={{ bgcolor: "#fff", color: "#ff9800", marginRight: 2, mb: 1 }}>
              A
            </Avatar>
            <Typography variant="h4">{name}</Typography>
          </Box>
          <Divider sx={{ color: "#fff" }} />
          <List>
            <ListItem
              button
              selected={selectedTab === "Phòng"}
              onClick={() => setSelectedTab("Phòng")}
              sx={{
                bgcolor: selectedTab === "Phòng" ? "#71A1DB" : "transparent",
                "&:hover": {
                  bgcolor: selectedTab === "Phòng" ? "#71A1DB" : "#f5f5f5"
                }
              }}
            >
              Phòng
            </ListItem>
            <ListItem
              button
              selected={selectedTab === "Bài đăng"}
              onClick={() => setSelectedTab("Bài đăng")}
              sx={{
                bgcolor: selectedTab === "Bài đăng" ? "#71A1DB" : "transparent",
                "&:hover": {
                  bgcolor: selectedTab === "Bài đăng" ? "#71A1DB" : "#f5f5f5"
                }
              }}
            >
              Bài đăng
            </ListItem>
          </List>

          {/* Back to Home Button */}
          <Box sx={{ mt: "auto", p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home")} // Navigate back to home
              fullWidth
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          bgcolor: "#f9f9f9" // Apply consistent background color
        }}
      >
        {selectedTab === "Phòng" && <RoomManagement />}
        {selectedTab === "Bài đăng" && <PostsManagement />}
      </Box>
    </Box>
  );
}

export default Owner;
