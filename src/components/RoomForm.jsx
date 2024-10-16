import { useState } from "react";
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axiosInstance from "../services/axiosInstance";
import ImageUpload from "./ImageUpload";

function RoomForm({ open, handleClose, selectedAddress, placeId }) {
  const [formData, setFormData] = useState({
    roomName: "",
    direction: 0,
    area: 0,
    rentAmount: 0,
    waterAmount: 0,
    electricAmount: 0,
    serviceAmount: 0,
    note: "",
    imageUrls: [] // Array to hold the uploaded image URLs
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (uploadedImages) => {
    setFormData((prevState) => ({
      ...prevState,
      imageUrls: uploadedImages.map((url, index) => ({
        imageUrl: url,
        no: index + 1
      }))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      ...formData,
      placeId: placeId, // Use selected address's placeId
      postedDate: new Date().toISOString(),
      isRented: false, // Default to not rented
      type: 0, // Example type, you can adjust this as needed
      status: 0, // Example status, adjust as necessary
      title: formData.roomName // Use room name as title for now
    };

    try {
      const response = await axiosInstance.post("/api/Room/Create", apiData);
      console.log("Room added successfully:", response.data);
      handleClose(); // Close modal after success
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm Phòng</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Room Fields */}
          <Grid item xs={6}>
            <TextField fullWidth name="roomName" label="Tên phòng" value={formData.roomName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="direction" label="Hướng phòng" type="number" value={formData.direction} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="area" label="Diện tích (m²)" type="number" value={formData.area} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="rentAmount" label="Giá cho thuê (VNĐ/tháng)" type="number" value={formData.rentAmount} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="waterAmount" label="Giá nước (VNĐ)" type="number" value={formData.waterAmount} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="electricAmount" label="Giá điện (VNĐ)" type="number" value={formData.electricAmount} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="serviceAmount" label="Phí dịch vụ (VNĐ)" type="number" value={formData.serviceAmount} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="note" label="Ghi chú" multiline rows={4} value={formData.note} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload onUpload={handleImageUpload} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit} color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomForm;
