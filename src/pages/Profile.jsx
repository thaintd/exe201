import React, { useState, useEffect } from "react";
import { TextField, Button, Avatar, Card, CardContent, CardHeader, Typography, Grid, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";

const ProfileUpdateForm = () => {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    imageUrl: "",
    name: "",
    phone: "",
    citizenId: "",
    birthDay: ""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [accountId, setAccountId] = useState("");

  // Lấy dữ liệu profile khi component được render
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/api/Auth/Account"); // Gọi API lấy thông tin người dùng
        console.log("Thông tin hồ sơ:", response.data.data);
        setAccountId(response.data.data.accountId);
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: response.data.data.email || "", // Email từ API
          password: response.data.data.password || "", // Password từ API
          imageUrl: response.data.data.imageUrl || "", // URL Ảnh từ API
          name: response.data.data.name || "" // Họ tên từ API
        }));
      } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        setSnackbarMessage("Lỗi khi tải hồ sơ.");
        setSnackbarOpen(true);
      }
    };

    fetchProfile();
  }, []);

  // Xử lý khi form thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(accountId);
    try {
      await axiosInstance.put(`/api/Account/Update/${accountId}`, profile); // Gọi API cập nhật thông tin người dùng
      console.log("Cập nhật", profile);
      setSnackbarMessage("Cập nhật hồ sơ thành công!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      setSnackbarMessage("Cập nhật hồ sơ thất bại.");
      setSnackbarOpen(true);
    }
  };

  // Đóng snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <CardHeader avatar={<Avatar sx={{ width: 56, height: 56 }} />} title={<Typography variant="h5">Cập nhật hồ sơ</Typography>} subheader="Điền thông tin của bạn bên dưới" />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
                InputLabelProps={{ shrink: true }} // Làm cho Label không bị đè lên
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Mật khẩu" name="password" value={profile.password} onChange={handleChange} variant="outlined" type="password" InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="URL Ảnh đại diện" name="imageUrl" value={profile.imageUrl} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={profile.name}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: !!profile.name }} // Hiển thị label khi đã có dữ liệu
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Số điện thoại" name="phone" value={profile.phone} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: !!profile.phone }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="CMND/CCCD" name="citizenId" value={profile.citizenId} onChange={handleChange} variant="outlined" InputLabelProps={{ shrink: !!profile.citizenId }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="birthDay"
                value={profile.birthDay ? profile.birthDay.split("T")[0] : ""} // Định dạng ngày sinh cho input date
                onChange={handleChange}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Cập nhật hồ sơ
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      {/* Snackbar thông báo thành công/thất bại */}
      <Snackbar open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} autoHideDuration={3000} />
    </Card>
  );
};

export default ProfileUpdateForm;
