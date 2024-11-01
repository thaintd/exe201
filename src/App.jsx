import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ConfirmEmail from "./components/VerifyEmail";
import ProductDetail from "./pages/HomeDetail";
import RentalForm from "./pages/Post";
import Register from "./pages/Register/Register";
import Owner from "./pages/Owner";
import ProfileUpdateForm from "./pages/Profile";
import SubscriptionPage from "./pages/SubscriptionPage";
import Intro from "./pages/Intro";
import RoomList from "./pages/RoomList";
import PaymentResultPage from "./pages/PaymentResultPage";
import { Box, Container } from "@mui/material";

function App() {
  const location = useLocation();
  const isOwnerPath = location.pathname === "/owner";

  return (
    <Box className={isOwnerPath ? "" : "app-container"}>
      {!isOwnerPath && <Header />}
      {isOwnerPath ? (
        <Routes>
          <Route path="/owner" element={<Owner />} />
        </Routes>
      ) : (
        <Container className="content-container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<ConfirmEmail />} />
            <Route path="/product-detail/:postId" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<RentalForm />} />
            <Route path="/profile" element={<ProfileUpdateForm />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/" element={<Intro />} />
            <Route path="/rooms/:roomType" element={<RoomList />} />
            <Route path="/payment" element={<PaymentResultPage />} />
          </Routes>
        </Container>
      )}
      {!isOwnerPath && <Footer />}
    </Box>
  );
}

export default App;
