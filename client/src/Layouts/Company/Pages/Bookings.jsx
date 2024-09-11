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
import TableView from "../Components/Bookings/TableView";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: 2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Bookings() {
  const { getBookingForService, allBookings, host } =
    useContext(CompanyContext);
  useEffect(() => {
    getBookingForService();
  }, []);
  // console.log(allBookings);
  const filtered = allBookings?.slice().reverse();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item sx={{ p: 5, borderRadius: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Bookings
              </Typography>
            </Box>
            <TableView data={filtered} host={host} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
