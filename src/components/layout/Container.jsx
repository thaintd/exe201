import { Container as MuiContainer } from "@mui/material";
import "./Container.scss";

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <div className="custom-container">
      <MuiContainer maxWidth={false} className="container-content">
        {children}
      </MuiContainer>
    </div>
  );
};

export default Container;
