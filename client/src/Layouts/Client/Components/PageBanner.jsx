import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import bg from "../Assets/bg2.jpg";
export default function PageBanner({ title }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#08323ad9",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: "900", color: "#ffffff91" }}
          >
            {title}
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#ffffff91",
            }}
          >
            <Link
              underline="hover"
              style={{ color: "#ffffff91", textDecoration: "none" }}
              to="/"
            >
              Home
            </Link>
            <Typography sx={{ color: "#ffffff91" }}>{title}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
}
