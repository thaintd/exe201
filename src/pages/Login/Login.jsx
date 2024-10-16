import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import { loginUser } from "../../services/accountService";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res.status === 200) {
        const token = res.data;
        localStorage.setItem("token", token);
      }
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <Box sx={{ margin: "50px 0" }}>
        <Grid container>
          <Grid item xs={6}>
            <Box component="img" src="https://res.cloudinary.com/dligpgeta/image/upload/v1726629841/Logo_4_qbnk1l.png" maxWidth={"400px"}></Box>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleLogin}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  ĐĂNG NHẬP
                </Typography>
                <TextField id="email" label="email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "300px", marginBottom: "5px" }} InputLabelProps={{ style: { textAlign: "center", width: "100%" } }} />
                <TextField id="password" label="Mật khẩu" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "300px" }} InputLabelProps={{ style: { textAlign: "center", width: "100%" } }} />
                <Button variant="contained" type="submit" style={{ marginTop: "20px", borderRadius: "15px" }}>
                  Đăng nhập
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Quên mật khẩu?
                </Typography>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
