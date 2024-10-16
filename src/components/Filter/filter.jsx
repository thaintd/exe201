import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const PriceFilter = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 2,
        maxWidth: 200,
        marginBottom: 2
      }}
    >
      <Typography variant="h4" sx={{ color: "#ff6f00", fontWeight: "bold", marginBottom: 2 }}>
        Lọc theo khoảng giá
      </Typography>
      <List>
        {["Thỏa thuận", "Dưới 1 triệu", "Dưới 2 triệu", "Dưới 3 triệu", "Trên 3 triệu"].map((item, index) => (
          <ListItem key={index} sx={{ paddingY: 0.5 }}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PriceFilter;
