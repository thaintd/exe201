// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DB6F16" // Màu chủ đạo
    },
    secondary: {
      main: "#dc004e"
    }
  },
  typography: {
    fontFamily: "Josefin Sans, sans-serif",
    fontSize: `24px`
  },
  components: {
    MuiGrid2: {
      defaultProps: {
        // all grids under this theme will apply
        // negative margin on the top and left sides.
        disableEqualOverflow: true
      }
    }
  }
});

export default theme;
