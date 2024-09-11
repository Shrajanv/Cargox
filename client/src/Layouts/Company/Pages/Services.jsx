import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InsertForm from "../Components/Categories/InsertForm";
import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { CompanyContext } from "../Context/Context";
import { useEffect } from "react";
import TableView from "../Components/Categories/TableView";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: 2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Services() {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const {
    getAllCategories,
    getAllServices,
    allServices,
    state,
    allCategories,
    host,
  } = useContext(CompanyContext);
  useEffect(() => {
    getAllServices();
    getAllCategories();
  }, [state]);
  console.log(allServices);
  const handleCancel = () => {
    setShow(false);
    setSelectedService(null);
  };
  const filtered = allServices?.slice().reverse();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {show && (
          <Grid item xs={12} md={12}>
            <Item sx={{ p: 5, borderRadius: "20px" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Insert New service
              </Typography>
              <InsertForm
                service={selectedService}
                show={show}
                setShow={setShow}
                categories={allCategories}
                setSelectedService={setSelectedService}
              />
            </Item>
          </Grid>
        )}
        <Grid item xs={12} md={12}>
          <Item sx={{ p: 5, borderRadius: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Services posted
              </Typography>
              {!show ? (
                <Button onClick={() => setShow(true)} sx={{ float: "right" }}>
                  Insert New Service
                </Button>
              ) : (
                <Button
                  sx={{ float: "right" }}
                  onClick={handleCancel}
                  color="error"
                >
                  Cancel
                </Button>
              )}
            </Box>
            <TableView
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              data={filtered}
              host={host}
              show={show}
              setShow={setShow}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
