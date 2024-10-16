import { Box, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../../services/accountService";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(email, password);
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận ");
      console.log("Register response:", response);
    } catch (error) {
      if (error.response.data.status === "This email is already used.") {
        toast.error("Email đã được sử dụng. Vui lòng sử dụng email khác.");
      } else {
        console.error("Lỗi khi đăng ký", error);
        toast.error("Lỗi khi đăng ký. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="Register">
      <Box sx={{ margin: "50px 0" }}>
        <Grid container>
          <Grid item xs={6}>
            <Box component="img" src="https://res.cloudinary.com/dligpgeta/image/upload/v1726629841/Logo_4_qbnk1l.png" sx={{ maxWidth: "400px" }} />
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleRegister}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  ĐĂNG KÝ
                </Typography>
                <TextField id="email" label="Email của bạn" variant="standard" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: "300px", mb: 1 }} />
                <TextField id="password" label="Mật khẩu" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: "300px" }} />
                <Button type="submit" variant="contained" sx={{ marginTop: 3, borderRadius: "15px" }} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Đăng ký"}
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
        <ToastContainer position="top-center" />
      </Box>
    </div>
  );
}
