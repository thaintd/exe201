import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Card, CardContent, Grid, CardActions, Tabs, Tab, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, CircularProgress, Checkbox } from "@mui/material";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import { getUserId } from "../services/auth";

function RoomManagement() {
  const [addresses, setAddresses] = useState([]); // Initially empty
  const [roomsByAddress, setRoomsByAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null); // Default to the first tab
  const [loading, setLoading] = useState(false);

  const [roomFormData, setRoomFormData] = useState({
    roomName: "",
    direction: 0,
    area: 0,
    interiorStatus: 0,
    type: 0,
    isRented: false,
    rentAmount: 0,
    waterAmount: 0,
    electricAmount: 0,
    serviceAmount: 0
  });
  const [formData, setFormData] = useState({
    province: "",
    distinct: "",
    ward: "",
    street: "",
    number: "",
    category: [0]
  });

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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
      const response = await axiosInstance.post("/api/Place/Create", apiData);
      console.log("Form submitted successfully:", response.data);

      await fetchAddresses();
      setOpenModal(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  const fetchAddresses = async () => {
    try {
      console.log("Fetching addresses...");
      const response = await axiosInstance.get("/api/Place/GetAll");

      const currentUserId = getUserId(); // Replace with actual logged-in user ID
      console.log("Current user ID:", currentUserId);

      if (response.data && response.data.data && Array.isArray(response.data.data.$values)) {
        const addressesData = response.data.data.$values
          .filter((address) => String(address.ownerId) === String(currentUserId))
          .map((address) => ({
            id: address.$id,
            placeId: address.placeId,
            province: address.province,
            district: address.distinct,
            ward: address.ward,
            number: address.number || "N/A",
            street: address.street || "N/A"
          }));

        setAddresses(addressesData); // Update state with filtered addresses
        console.log("Fetched addresses for current user:", addressesData);
      } else {
        console.warn("No addresses found in the response.");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Fetch addresses on component load
  useEffect(() => {
    fetchAddresses(); // Trigger fetch on component load
  }, []);

  const handleAddRoom = () => {
    setOpenRoomModal(true);
  };

  const fetchRoomsForPlace = async (placeId) => {
    try {
      setLoading(true); // Start loading
      const response = await axiosInstance.get(`/api/Room/RoomsByPlaceId?placeId=${placeId}`);
      setRoomsByAddress((prevRooms) => ({
        ...prevRooms,
        [placeId]: response.data.data.$values || []
      }));
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle tab change

  const handleTabChange = async (event, newValue) => {
    setSelectedAddress(newValue);
    const selectedPlaceId = addresses[newValue]?.placeId;
    await fetchRoomsForPlace(selectedPlaceId);
  };

  // Handle room form submission
  const handleRoomSubmit = async (e) => {
    e.preventDefault();

    const selectedPlaceId = addresses[selectedAddress].placeId; // Get the selected placeId from addresses
    const apiRoomData = {
      ...roomFormData,
      placeId: selectedPlaceId // Include placeId in the room data
    };
    console.log("Submitting room form:", apiRoomData);
    try {
      const response = await axiosInstance.post("api/Room/CreateRoom", apiRoomData);
      console.log("Room created successfully:", response.data);

      setOpenRoomModal(false); // Close the modal after successful submission
      await fetchRoomsForPlace(selectedPlaceId); // Fetch rooms again to update the list
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleRoomDetailOpen = (room) => {
    setRoomFormData(room);
    setOpenDetailModal(true);
  };

  const handleRoomEditOpen = (room) => {
    setRoomFormData(room);
    setOpenEditModal(true);
  };

  const handleRoomEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/Room/UpdateRoom/${roomFormData.roomId}`, roomFormData);
      // Refresh room list after update
      await fetchRoomsForPlace(addresses[selectedAddress].placeId);
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Filters and Action Buttons */}
      <Box display="flex" justifyContent="space-between" my={1}>
        <Box>
          <Button variant="contained" color="success" style={{ marginRight: "8px" }} onClick={() => setOpenModal(true)}>
            Thêm địa chỉ
          </Button>
          <Button variant="contained" color="primary" style={{ marginRight: "8px" }} onClick={handleAddRoom} disabled={selectedAddress === null}>
            Thêm phòng
          </Button>
        </Box>
      </Box>

      {/* Address Tabs */}
      {selectedAddress === null && <Typography variant="body2">Vui lòng chọn địa chỉ để xem danh sách phòng.</Typography>}
      <Tabs value={selectedAddress} onChange={handleTabChange} aria-label="address tabs">
        {addresses.length === 0 ? <Tab label="Bạn chưa có địa chỉ nào" /> : addresses.map((address, index) => <Tab key={index} label={`${address.number}-${address.street}`} value={index} />)}
      </Tabs>

      {/* Rooms List */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} marginTop={3}>
          {roomsByAddress[addresses[selectedAddress]?.placeId]?.length ? (
            roomsByAddress[addresses[selectedAddress]?.placeId].map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room.roomId}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {room.roomName}
                    </Typography>
                    <Typography variant="body2">Giá thuê: {room.rentAmount} VND</Typography>
                    <Typography variant="body2">Tình trạng: {room.isRented ? "Đã thuê" : "Chưa thuê"}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleRoomDetailOpen(room)}>
                      Chi tiết
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleRoomEditOpen(room)}>
                      Chỉnh sửa
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" marginLeft={2}>
              Không có phòng nào trong địa chỉ này.
            </Typography>
          )}
        </Grid>
      )}

      {/* Room Detail Modal */}
      <Dialog open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
        <DialogTitle>Chi tiết phòng</DialogTitle>
        <DialogContent>
          <Typography variant="h5">{roomFormData.roomName}</Typography>
          <Typography variant="body2">Diện tích: {roomFormData.area} m2</Typography>
          <Typography variant="body2">Giá thuê: {roomFormData.rentAmount} VND</Typography>
          <Typography variant="body2">Tiền nước: {roomFormData.waterAmount} VND</Typography>
          <Typography variant="body2">Tiền điện: {roomFormData.electricAmount} VND</Typography>
          <Typography variant="body2">Tình trạng nội thất: {roomFormData.interiorStatus}</Typography>
          <Typography variant="body2">Loại phòng: {roomFormData.type}</Typography>
          <Typography variant="body2">Hướng: {roomFormData.direction}</Typography>
          <Typography variant="body2">Tình trạng: {roomFormData.isRented ? "Đã thuê" : "Chưa thuê"}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailModal(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Room Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Chỉnh sửa phòng</DialogTitle>
        <DialogContent>
          <TextField label="Tên phòng" name="roomName" value={roomFormData.roomName || ""} onChange={handleRoomChange} fullWidth margin="normal" />
          <TextField label="Giá thuê" name="rentAmount" type="number" value={roomFormData.rentAmount || ""} onChange={handleRoomChange} fullWidth margin="normal" />
          <TextField label="Diện tích" name="area" type="number" value={roomFormData.area || ""} onChange={handleRoomChange} fullWidth margin="normal" />
          {/* Include other fields as necessary... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Hủy</Button>
          <Button onClick={handleRoomEditSubmit} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Address Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Thêm địa chỉ</DialogTitle>
        <DialogContent>
          <TextField fullWidth select name="province" label="Tỉnh/Thành phố" value={formData.province} onChange={handleChange} required>
            {provinces.map((province) => (
              <MenuItem key={province.province_id} value={province.province_id}>
                {province.province_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField fullWidth select name="distinct" label="Quận/Huyện" value={formData.distinct} onChange={handleChange} required disabled={!formData.province}>
            {districts.map((district) => (
              <MenuItem key={district.district_id} value={district.district_id}>
                {district.district_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField fullWidth select name="ward" label="Phường/Xã" value={formData.ward} onChange={handleChange} required disabled={!formData.distinct}>
            {wards.map((ward) => (
              <MenuItem key={ward.ward_id} value={ward.ward_id}>
                {ward.ward_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField label="Số nhà" name="number" value={formData.number} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Tên đường" name="street" value={formData.street} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Hủy</Button>
          <Button onClick={handleSubmit} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Room Modal */}
      <Dialog open={openRoomModal} onClose={() => setOpenRoomModal(false)}>
        <DialogTitle>Thêm phòng</DialogTitle>
        <DialogContent>
          <TextField label="Tên phòng" name="roomName" value={roomFormData.roomName} onChange={handleRoomChange} fullWidth margin="normal" />

          {/* Direction Select */}
          <TextField select label="Hướng phòng" name="direction" value={roomFormData.direction} onChange={handleRoomChange} fullWidth margin="normal">
            <MenuItem value={1}>Bắc</MenuItem>
            <MenuItem value={2}>Đông Bắc</MenuItem>
            <MenuItem value={3}>Đông</MenuItem>
            <MenuItem value={4}>Đông Nam</MenuItem>
            <MenuItem value={5}>Nam</MenuItem>
            <MenuItem value={6}>Tây Nam</MenuItem>
            <MenuItem value={7}>Tây</MenuItem>
            <MenuItem value={8}>Tây Bắc</MenuItem>
          </TextField>

          <TextField label="Diện tích" name="area" type="number" value={roomFormData.area} onChange={handleRoomChange} fullWidth margin="normal" />

          {/* Interior Status Select */}
          <TextField select label="Tình trạng nội thất" name="interiorStatus" value={roomFormData.interiorStatus} onChange={handleRoomChange} fullWidth margin="normal">
            <MenuItem value={1}>Trống</MenuItem>
            <MenuItem value={2}>Cơ bản</MenuItem>
            <MenuItem value={3}>Đầy đủ</MenuItem>
            <MenuItem value={4}>Nội thất Cao cấp</MenuItem>
          </TextField>

          {/* Type Select */}
          <TextField select label="Loại phòng" name="type" value={roomFormData.type} onChange={handleRoomChange} fullWidth margin="normal">
            <MenuItem value={1}>Nhà trọ</MenuItem>
            <MenuItem value={2}>Chung cư</MenuItem>
            <MenuItem value={3}>Nhà nguyên căn</MenuItem>
          </TextField>

          <TextField label="Giá thuê" name="rentAmount" type="number" value={roomFormData.rentAmount} onChange={handleRoomChange} fullWidth margin="normal" />
          <TextField label="Tiền nước" name="waterAmount" type="number" value={roomFormData.waterAmount} onChange={handleRoomChange} fullWidth margin="normal" />
          <TextField label="Tiền điện" name="electricAmount" type="number" value={roomFormData.electricAmount} onChange={handleRoomChange} fullWidth margin="normal" />
          <TextField label="Tiền dịch vụ" name="serviceAmount" type="number" value={roomFormData.serviceAmount} onChange={handleRoomChange} fullWidth margin="normal" />

          {/* Is Rented Checkbox */}
          <Grid container alignItems="center">
            <Grid item>
              <Checkbox
                checked={roomFormData.isRented}
                onChange={(e) =>
                  setRoomFormData((prevState) => ({
                    ...prevState,
                    isRented: e.target.checked
                  }))
                }
              />
            </Grid>
            <Grid item>
              <Typography>Đã thuê</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoomModal(false)}>Hủy</Button>
          <Button onClick={handleRoomSubmit} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RoomManagement;
