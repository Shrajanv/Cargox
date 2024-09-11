import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { CompanyContext } from "../Context/Context";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SingleBooking from "../Components/Bookings/SingleBooking";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: 2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function BookingDetails() {
  const { singleBooking, setSingleBooking, getSingleBooking, host } =
    useContext(CompanyContext);
  const { id } = useParams();
  useEffect(() => {
    getSingleBooking(id);
  }, [id]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item sx={{ p: 5, borderRadius: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Booking Details
              </Typography>
            </Box>
            <SingleBooking data={singleBooking} host={host} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
