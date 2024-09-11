import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import aboutImg from "../../Assets/cargo.jpg"; // Ensure you have this image in the correct path

const AboutContent = () => {
  return (
    <Box sx={{ py: 5 }} className="about_section">
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="detail-box">
              <Box className="heading_container" sx={{ mb: 2 }}>
                <Typography
                  sx={{ fontWeight: "900" }}
                  variant="h2"
                  component="h2"
                >
                  About <span style={{ color: "#ff8b00" }}>Us</span>
                </Typography>
              </Box>
              <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
  At CargoX, we are dedicated to transforming the logistics and transportation industry with our advanced management system. Our platform is designed to simplify and enhance cargo handling for businesses and clients alike. With a focus on efficiency and user experience, we provide a comprehensive solution that streamlines operations and ensures smooth, reliable service. Whether you're a company looking to manage shipments or a client tracking cargo, CargoX offers the tools and support you need to succeed.
</Typography>

            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="img-box">
              <img
                src={aboutImg}
                alt="About Us"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutContent;
