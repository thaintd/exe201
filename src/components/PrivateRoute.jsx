import { Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
