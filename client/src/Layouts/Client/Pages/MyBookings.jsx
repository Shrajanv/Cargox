import { Box, Typography } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import BookingCard from "../Components/Bookings/BookingCard";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
import noData from "../Assets/noData.png";
export default function MyBookings() {
  const { host, getBookings, allBookings } = useContext(CustomerContext);
  useEffect(() => {
    getBookings();
  }, []);
  console.log(allBookings);
  return (
    <Box>
      <Box>
        <PageBanner title="My Transactions" />
      </Box>
      <Box sx={{ p: 3 }}>
        {allBookings?.length > 0 ? (
          allBookings?.map((item, index) => (
            <BookingCard host={host} key={index} data={item} />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={noData} style={{ width: "300px" }} alt="noData" />
            <Typography sx={{ fontWeight: "600", color: "#08323ad9" }}>
              No Booking found!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
