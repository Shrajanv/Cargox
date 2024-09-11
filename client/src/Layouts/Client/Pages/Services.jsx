import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Paper,
  Grid,
  InputBase,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import PageBanner from "../Components/PageBanner";
import AlCategoriesList from "../Components/Service/AlCategoriesList";
import ServiceCard from "../Components/Service/ServiceCard";
import NoService from "../Components/Service/NoService";
import { CustomerContext } from "../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Services() {
  const {
    allCategories,
    getAllCategories,
    allServices,
    viewAllServices,
    host,
  } = useContext(CustomerContext);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    getAllCategories();
    viewAllServices();
  }, []);

  useEffect(() => {
    const filtered = allServices.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" ||
        service.categoryId?._id == selectedCategory;
      const matchesSearch = service.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredServices(filtered);
  }, [selectedCategory, search, allServices]);

  return (
    <Box>
      <Box>
        <PageBanner title="Services" />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={4}>
            <Paper
              elevation={1}
              component="form"
              sx={{
                p: "2px 14px",
                display: "flex",
                alignItems: "center",
                mt: 3,
              }}
            >
              <InputBase
                onChange={(e) => setSearch(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search service here"
                inputProps={{ "aria-label": "search service here" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <AlCategoriesList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              data={allCategories}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((item, index) => (
                <ServiceCard host={host} data={item} key={index} />
              ))
            ) : (
              <NoService />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
