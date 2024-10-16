import { Typography, Grid } from "@mui/material";
import Carousel from "../components/Carousel/Carousel";
import HomeCardList from "../components/HomeInfor/HomeInfo";
import PriceFilter from "../components/Filter/filter";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Grid container sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
            Danh sách nhà cho thuê
          </Typography>
          <HomeCardList />
          <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
            Danh sách trọ cho thuê
          </Typography>
          <HomeCardList />
          <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: 2, marginBottom: 2 }}>
            Danh sách chung cư cho thuê
          </Typography>
          <HomeCardList />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ mt: 5 }}>
          <PriceFilter />
          <PriceFilter />
          <PriceFilter />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
