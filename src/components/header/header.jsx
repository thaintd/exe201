import "./header.scss";
import { AppBar, Toolbar, Grid, Button, Box, Divider, useMediaQuery, useTheme, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/accountService";
import { getUserId } from "../../services/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");
  const userId = getUserId();

  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleMenuClose();
  };

  useEffect(() => {
    if (token && userId) {
      getUserProfile({ userId }).then((res) => {
        console.log("User profile:", res.result.data);
        setName(res.result.data.name);
      });
    }
  }, [token, userId]);

  return (
    <AppBar position="static" className="custom_header">
      <Toolbar>
        <Grid container alignItems="center">
          {!isMobile && (
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate("/home")}>
                    Trang chủ
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate("/")}>
                    Giới thiệu
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => navigate("/owner")} color="inherit">
                    Quản lý
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate("/subscription")}>
                    Dịch vụ
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={isMobile ? 6 : 4} container justifyContent="center">
            <Box
              component="img"
              src="https://res.cloudinary.com/dligpgeta/image/upload/v1726629565/Logo_3_fdgfyt.png"
              alt="logo"
              className="logo"
              sx={{ cursor: "pointer", maxWidth: "200px" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Grid>
          <Grid item xs={isMobile ? 6 : 4} container justifyContent="flex-end" spacing={2}>
            {token ? (
              <>
                <Grid item>
                  <Button color="inherit" sx={{ display: "flex", alignItems: "center", textTransform: "none" }} onClick={handleMenuOpen}>
                    <Avatar alt="avatar" sx={{ width: 32, height: 32, marginRight: 1 }} />
                    <span className="user_name">{name}</span>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      style: {
                        width: "200px"
                      }
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleMenuClose();
                      }}
                    >
                      Thông tin tài khoản
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </Button>
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: "white", width: "2px", height: "24px" }} />
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate("/register")}>
                    Đăng ký
                  </Button>
                </Grid>
              </>
            )}
            <Grid item>
              <Button color="inherit" className="custom_button" onClick={() => navigate("/post")} sx={{ textTransform: "none" }}>
                Đăng tin
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
