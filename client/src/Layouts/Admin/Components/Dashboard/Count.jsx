import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BookIcon from "@mui/icons-material/Book";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Count({ data }) {
  let report = [
    {
      title: "Total Clients",
      count: data?.customers,
      icon: <GroupsIcon sx={{ fontSize: "60px", color: "#ff8e29" }} />,
    },
    {
      title: "Total Companies",
      count: data?.companies,
      icon: <ApartmentIcon sx={{ fontSize: "60px", color: "#ff8e29" }} />,
    },
    {
      title: "Total Services",
      count: data?.services,
      icon: <LocalShippingIcon sx={{ fontSize: "60px", color: "#ff8e29" }} />,
    },
    {
      title: "Total Bookings",
      count: data?.bookings,
      icon: <BookIcon sx={{ fontSize: "60px", color: "#ff8e29" }} />,
    },
  ];
  console.log(data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {report?.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Box
              component={Paper}
              sx={{
                width: "100%",
                height: "10vh",
                borderRadius: "20px",
                p: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "5px solid #ff8e29",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "10vh",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontSize: "30px", fontWeight: "900" }}
                >
                  {item?.count}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "600" }}
                  gutterBottom
                >
                  {item?.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "40%",
                  height: "10vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item?.icon}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
