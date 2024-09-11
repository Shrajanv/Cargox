import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Behance } from "@mui/icons-material";
import bg from "../../Assets/bg1.jpg";
const Footer = () => {
  return (
    <Box
      sx={{
        // py: 4,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ backgroundColor: "#08323ad9", py: 4, color: "#ffffff91" }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={3} md={6} sm={6}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  component={Typography}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff91",
                      fontWeight: "1000",
                      fontSize: "35px",
                    }}
                  >
                    CargoX
                  </span>
                </Link>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" sx={{ textAlign: 'justify', mx: 'auto', maxWidth: 800 }}>
  Discover seamless logistics management with CargoX. Our platform is designed to optimize every aspect of your cargo operations, from real-time tracking to efficient booking and comprehensive reporting. With CargoX, you can trust in our reliable technology and exceptional support to enhance your logistics experience and drive your success.
</Typography>


              </Box>
            </Grid>

            <Grid item lg={3} md={6} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Link
                  component={Typography}
                  variant="body2"
                  display="block"
                  style={{ mb: 1, color: "#ffffff91", textDecoration: "none" }}
                  to={"/"}
                >
                  Home
                </Link>
                <Link
                  component={Typography}
                  variant="body2"
                  display="block"
                  style={{ mb: 1, color: "#ffffff91", textDecoration: "none" }}
                  to={"/About"}
                >
                  About
                </Link>
                <Link
                  component={Typography}
                  variant="body2"
                  display="block"
                  style={{ mb: 1, color: "#ffffff91", textDecoration: "none" }}
                  to={"/Contact"}
                >
                  Contact
                </Link>
                <Link
                  component={Typography}
                  variant="body2"
                  display="block"
                  style={{ mb: 1, color: "#ffffff91", textDecoration: "none" }}
                  to={"/Services"}
                >
                  Services
                </Link>
              </Box>
            </Grid>

            <Grid item lg={3} md={6} sm={6}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" paragraph>
                Do you have any questions or suggestions?{" "}
                <Link
                  component={Typography}
                  variant="body2"
                  style={{ color: "#ffffff91" }}
                >
                  ourservices@ultras.com
                </Link>
              </Typography>
              <Typography variant="body2" paragraph>
                Do you need assistance? Give us a call.
                <br />
                <strong>+57 444 11 00 35</strong>
              </Typography>
            </Grid>

            <Grid item lg={3} md={6} sm={6}>
              <Typography variant="h6" gutterBottom>
                Forever 2018
              </Typography>
              <Typography variant="body2" paragraph sx={{ textAlign: 'justify' }}>
  At CargoX, we specialize in providing top-tier logistics solutions tailored to meet the diverse needs of businesses. Our advanced platform integrates real-time tracking, efficient booking processes, and detailed reporting to ensure smooth and reliable cargo management. By focusing on innovation and customer satisfaction, we empower businesses to streamline their operations and enhance their logistics efficiency. Trust CargoX for a comprehensive and dependable approach to managing your shipments.
</Typography>

            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body2" sx={{ color: "#ffffff91" }}>
            &copy; {new Date().getFullYear()} CangoEx. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
