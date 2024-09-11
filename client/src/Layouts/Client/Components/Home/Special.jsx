import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import cargoSeaImage from "../../Assets/truck.jpg"; // Ensure you have this image in the correct path

const Special = () => {
  return (
    <Box
      id="why-us-section"
      className="block__73694 site-section border-top"
      sx={{ py: 10, position: "relative" }}
    >
      <Container>
        <Grid container spacing={4} alignItems="stretch">
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              //   maxHeight: "400px",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "70vh",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${cargoSeaImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mt: { xs: 4, lg: 0 },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className="text-black"
            >
              Why Us
            </Typography>
            <Typography
              variant="subtitle1"
              component="h4"
              gutterBottom
              color="primary"
            >
              We work quickly and efficiently!
            </Typography>
            <Typography variant="caption" paragraph sx={{ textAlign: 'justify' }}>
  Why Choose CargoX? At CargoX, we combine cutting-edge technology with a user-friendly interface to provide an unmatched logistics management experience. Our platform offers real-time tracking, seamless integration, and reliable performance to keep your shipments on track. With exceptional customer support and comprehensive solutions tailored to your needs, CargoX ensures efficient, accurate, and hassle-free cargo management. Choose us to elevate your logistics operations and experience the difference in excellence.
</Typography>

            <List sx={{ mt: 0 }}>
              {[
                "Cargo express",
                "Secure Services",
                "Secure Warehousing",
                "Cost savings",
                "Proven by great companies",
              ].map((item, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    component={Typography}
                    variant="caption"
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Special;
