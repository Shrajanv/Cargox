import { useContext } from "react";
import { CompanyContext } from "../Context/Context";
import { useEffect } from "react";
import { Box, tabScrollButtonClasses } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Counts from "../Components/Dashboard/Counts";
import TableView from "../Components/Bookings/TableView";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const { counts, getCounts, allBookings, getBookingForService, host } =
    useContext(CompanyContext);
  useEffect(() => {
    getCounts();
    getBookingForService();
  }, []);
  console.log(counts);
  console.log(allBookings);
  const filtered = allBookings?.slice().reverse().slice(0, 4);

  return (
    <Box>
      <Box sx={{ pt: 1 }}>
        <Counts data={counts} />
      </Box>{" "}
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item sx={{ p: 5, borderRadius: "20px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Recent Bookings
                </Typography>
              </Box>
              <TableView dashboard={true} data={filtered} host={host} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
