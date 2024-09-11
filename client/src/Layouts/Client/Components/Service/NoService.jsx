import { Box, Typography } from "@mui/material";
import React from "react";
import noResult from "../../Assets/noResult.png";
export default function NoService() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "300px" }}>
        <img
          src={noResult}
          alt="No Service"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Typography
          gutterBottom
          variant="body2"
          sx={{ textAlign: "center" }}
          color="text.secondary"
        >
          No service found!
        </Typography>
      </Box>
    </Box>
  );
}
