import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import trackBg from "../../Assets/transport.jpg"; // Ensure you have this image in the correct path

const PlainBanner = () => {
  return (
    <Box
      sx={{ position: "relative", py: 5, overflow: "hidden" }}
      className="track_section"
    >
      <Box
        className="track_bg_box"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url(${trackBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          //   opacity: 0.5,
        }}
      ></Box>
      <Box sx={{ backgroundColor: "#00000047", width: "100%", height: "100%" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box className="heading_container" sx={{ mb: 2 }}>
                <Typography
                  sx={{ fontWeight: "900", color: "#ffffff91" }}
                  variant="h2"
                  component="h2"
                >
                  Track Your Shipment
                </Typography>
              </Box>
              <Typography sx={{ color: "#ffffff91", textAlign: 'justify' }} variant="body1" paragraph>
  Welcome to CargoX, where tracking your shipment is simple and straightforward. Our advanced logistics platform allows you to monitor your cargo in real-time, providing you with complete visibility and control over your shipments. Whether you're managing multiple deliveries or just keeping an eye on a single package, CargoX ensures you stay informed with accurate updates and seamless tracking. Experience the convenience of effortless shipment monitoring and stay connected with your cargo every step of the way.
</Typography>

            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default PlainBanner;
