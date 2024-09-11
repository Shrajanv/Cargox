import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
import Count from "../Components/Dashboard/Count";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import TableView from "../Components/Company/TableView";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: 2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const { getAllCompanies, state, allCompanies, host, counts, getCounts } =
    useContext(AdminContext);
  useEffect(() => {
    getAllCompanies();
    getCounts();
  }, [state]);
  console.log(allCompanies);
  const filtered = allCompanies?.slice().reverse(0, 4);
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Count data={counts} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Item sx={{ p: 5, borderRadius: "20px" }}>
              <Typography variant="caption" component="h2">
                Recently registered companies
              </Typography>
              <TableView dashboard={true} data={filtered} host={host} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
