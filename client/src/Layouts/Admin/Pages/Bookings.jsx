import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InsertForm from "../Components/Categories/InsertForm";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import BookingTable from "../Components/BookingTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: 2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Bookings() {
  const { allBookings, getAllBookings, state, host } = useContext(AdminContext);
  useEffect(() => {
    getAllBookings();
  }, [state]);
  console.log(allBookings);
  const filtered = allBookings?.slice().reverse();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item sx={{ p: 5, borderRadius: "20px" }}>
            <Typography variant="subtitle1" color="text.secondary">
              Bookings
            </Typography>
            <BookingTable data={filtered} host={host} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
