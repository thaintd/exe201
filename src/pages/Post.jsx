import { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import axiosInstance from "../services/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    province: "",
    distinct: "",
    ward: "",
    street: "",
    number: "",
    roomName: "",
    direction: 0,
    area: 0,
    interiorStatus: 0,
    isRented: false,
    rentAmount: 0,
    waterAmount: 0,
    electricAmount: 0,
    serviceAmount: 0,
    note: "",
    title: "",
    categories: [0],
    status: 0,
    imageUrls: []
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State to store names of the selected address fields
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  // Fetch provinces from new API
  useEffect(() => {
    axios.get("https://vapi.vnappmob.com/api/province/").then((response) => {
      console.log("Provinces:", response.data.results);
      setProvinces(response.data.results);
    });
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (formData.province) {
      axios.get(`https://vapi.vnappmob.com/api/province/district/${formData.province}`).then((response) => {
        console.log("Districts:", response.data.results);
        setDistricts(response.data.results);
        setWards([]); // Reset wards when province changes
      });
    }
  }, [formData.province]);

  // Fetch wards when a district is selected
  useEffect(() => {
    if (formData.distinct) {
      axios.get(`https://vapi.vnappmob.com/api/province/ward/${formData.distinct}`).then((response) => {
        console.log("Wards:", response.data.results);
        setWards(response.data.results);
      });
    }
  }, [formData.distinct]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // Update address names based on selected codes
    if (name === "province") {
      const selectedProvince = provinces.find((province) => province.province_id === value);
      console.log("Selected province:", selectedProvince);
      setProvinceName(selectedProvince?.province_name);
      console.log("Province name:", provinceName);
    } else if (name === "distinct") {
      const selectedDistrict = districts.find((district) => district.district_id === value);
      setDistrictName(selectedDistrict ? selectedDistrict.district_name : "");
    } else if (name === "ward") {
      const selectedWard = wards.find((ward) => ward.ward_id === value);
      setWardName(selectedWard ? selectedWard.ward_name : "");
    }
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the selected province, district, and ward names at the time of form submission
    const selectedProvince = provinces.find((province) => province.province_id === formData.province);
    const selectedDistrict = districts.find((district) => district.district_id === formData.distinct);
    const selectedWard = wards.find((ward) => ward.ward_id === formData.ward);

    const apiData = {
      ...formData,
      province: selectedProvince ? selectedProvince.province_name : "", // Use province name
      distinct: selectedDistrict ? selectedDistrict.district_name : "", // Use district name
      ward: selectedWard ? selectedWard.ward_name : "", // Use ward name
      postedDate: new Date().toISOString() // Add posted date automatically
    };
    console.log("Submitting form:", apiData);

    try {
      const response = await axiosInstance.post("/api/Post/Create", apiData);
      toast.success("Đăng tin thành công!");
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = (imageUrls) => {
    const currentLength = formData.imageUrls.length;

    const formattedImages = imageUrls.map((url, index) => ({
      imageUrl: url,
      no: currentLength + index // Assign unique number to the new images
    }));

    setFormData((prevState) => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, ...formattedImages]
    }));

    console.log("Image URLs:", [...formData.imageUrls, ...formattedImages]);
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Đăng tin cho thuê nhà
      </Typography>

      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField fullWidth name="title" label="Tiêu đề" value={formData.title} onChange={handleChange} required />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth select name="province" label="Tỉnh/Thành phố" value={formData.province} onChange={handleChange} required>
            {provinces.map((province) => (
              <MenuItem key={province.province_id} value={province.province_id}>
                {province.province_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth select name="distinct" label="Quận/Huyện" value={formData.distinct} onChange={handleChange} required disabled={!formData.province}>
            {districts.map((district) => (
              <MenuItem key={district.district_id} value={district.district_id}>
                {district.district_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth select name="ward" label="Phường/Xã" value={formData.ward} onChange={handleChange} required disabled={!formData.distinct}>
            {wards.map((ward) => (
              <MenuItem key={ward.ward_id} value={ward.ward_id}>
                {ward.ward_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Street and House Number */}
        <Grid item xs={6}>
          <TextField fullWidth name="street" label="Tên đường" value={formData.street} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth name="number" label="Số nhà" value={formData.number} onChange={handleChange} required />
        </Grid>

        {/* Other fields */}
        <Grid item xs={6}>
          <TextField fullWidth name="roomName" label="Tên phòng" value={formData.roomName} onChange={handleChange} required />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth name="direction" label="Hướng phòng" type="number" value={formData.direction} onChange={handleChange} required />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="area" label="Diện tích (m²)" type="number" value={formData.area} onChange={handleChange} required />
        </Grid>

        {/* Rental Amount */}
        <Grid item xs={6}>
          <TextField fullWidth name="rentAmount" label="Giá cho thuê (VNĐ/tháng)" type="number" value={formData.rentAmount} onChange={handleChange} required />
        </Grid>

        {/* Other Amounts */}
        <Grid item xs={6}>
          <TextField fullWidth name="waterAmount" label="Giá nước (VNĐ)" type="number" value={formData.waterAmount} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth name="electricAmount" label="Giá điện (VNĐ)" type="number" value={formData.electricAmount} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth name="serviceAmount" label="Phí dịch vụ (VNĐ)" type="number" value={formData.serviceAmount} onChange={handleChange} />
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <TextField fullWidth name="note" label="Ghi chú" multiline rows={4} value={formData.note} onChange={handleChange} />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <ImageUpload onUpload={handleImageUpload} />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Đăng tin
          </Button>
        </Grid>
      </Grid>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default RentalForm;
