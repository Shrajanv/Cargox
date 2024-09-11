import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sliderBg from "../../Assets/heroBg.jpg"; // Ensure you have this image in the correct path

const Hero = () => {
  return (
    <Box
      className="slider_section"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <Box
        className="slider_bg_box"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url(${sliderBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></Box>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showArrows={true}
      >
        {[1, 2, 3].map((item) => (
          <Box key={item}>
            <Container>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100vh" }}
              >
                <Box sx={{ textAlign: "left", color: "#ffffff91" }}>
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: "900" }}
                    component="h1"
                    gutterBottom
                  >
                    We Provide Best <br />
                    Transport Service
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
  Welcome to CargoX, your ultimate solution for streamlined logistics and efficient cargo management. Our cutting-edge platform offers real-time tracking, seamless booking, and comprehensive control over your shipments. Whether you’re a business looking to optimize operations or a client tracking your cargo, CargoX delivers unmatched reliability and ease. Discover how our advanced technology and user-friendly interface can transform your logistics experience today.
</Typography>

                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                  >
                    <Button variant="" color="primary" className="btn1">
                      About US
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Hero;
