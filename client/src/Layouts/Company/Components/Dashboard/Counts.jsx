import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Person3Icon from "@mui/icons-material/Person3";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Counts({ data }) {
  let report = [
    {
      title: "Services posted",
      count: data?.services,
      icon: <CategoryIcon sx={{ fontSize: "50px", color: "#ff8e29" }} />,
    },
    {
      title: "Bookings completed",
      count: data?.bookings,
      icon: <ArticleIcon sx={{ fontSize: "50px", color: "#ff8e29" }} />,
    },
    {
      title: "Revenue generated",
      count: data?.revenue,
      icon: (
        <AccountBalanceWalletIcon sx={{ fontSize: "50px", color: "#ff8e29" }} />
      ),
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {report?.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                borderRight: "5px solid #ff8e29",
                width: "100%",
                borderRadius: "20px",
                p: 2,
              }}
            >
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "25px",
                        fontWeight: "900",
                        // fontFamily: "Libre Baskerville",
                      }}
                    >
                      {item?.count}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        // fontFamily: "Libre Baskerville",
                      }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item?.icon}
                  {/* <GroupsIcon sx={{ fontSize: "50px", color: "#ff8e29" }} /> */}
                </Box>
              </Box>
              <Box></Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
