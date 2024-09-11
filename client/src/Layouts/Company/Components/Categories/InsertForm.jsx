import React, { useState, useContext, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { CompanyContext } from "../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InsertForm({
  categories,
  show,
  setShow,
  service,
  setSelectedService,
}) {
  const { insertService, updateService } = useContext(CompanyContext);
  const [serviceInfo, setServiceInfo] = useState({
    title: "",
    picture: null,
    categoryId: "",
    description: "",
    charge: "",
  });

  useEffect(() => {
    if (service) {
      setServiceInfo({
        title: service?.title,
        picture: service?.picture,
        categoryId: service?.categoryId?._id,
        description: service?.description,
        charge: service?.charge,
        status: service?.status,
      });
    }
  }, [service, show]);
  console.log(serviceInfo);
  console.log(serviceInfo.categoryId);
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("title", serviceInfo.title);
    Data.append("charge", serviceInfo.charge);
    Data.append("categoryId", serviceInfo.categoryId);
    Data.append("description", serviceInfo.description);
    Data.append("picture", serviceInfo.picture);
    if (service) {
      Data.append("status", serviceInfo.status);
      updateService(service._id, Data);
    } else {
      insertService(Data);
    }

    // Reset the form state
    setServiceInfo({
      title: "",
      picture: null,
      categoryId: "",
      description: "",
      charge: "",
    });
    setShow(!show);
    setSelectedService(null);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    setServiceInfo({ ...serviceInfo, picture: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceInfo({ ...serviceInfo, [name]: value });
  };

  return (
    <Box sx={{ flexGrow: 1, pt: 2 }}>
      <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            title="Title is required"
            onChange={handleInputChange}
            label="Enter service title"
            fullWidth
            type="text"
            name="title"
            value={serviceInfo.title}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            title="Charge is required"
            onChange={handleInputChange}
            label="Enter service charge"
            fullWidth
            type="number"
            name="charge"
            value={serviceInfo.charge}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required={service ? false : true}
            title="Picture is required"
            onChange={handleFileChange}
            type="file"
            label="Upload service picture"
            fullWidth
            name="picture"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { accept: "image/*" } }}
            inputRef={fileInputRef}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select category</InputLabel>
            <Select
              required
              labelId="category-select-label"
              id="category-select"
              value={serviceInfo.categoryId || ""}
              label="Select category"
              onChange={(e) =>
                setServiceInfo({ ...serviceInfo, categoryId: e.target.value })
              }
            >
              {categories?.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            rows={2}
            title="Description is required"
            onChange={handleInputChange}
            label="Type service description here"
            fullWidth
            name="description"
            value={serviceInfo.description}
          />
        </Grid>
        {service && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Update status</InputLabel>
              <Select
                required
                labelId="category-select-label"
                id="category-select"
                value={serviceInfo.status || ""}
                label="Update status"
                onChange={(e) =>
                  setServiceInfo({ ...serviceInfo, status: e.target.value })
                }
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="outlined" sx={{ p: 1 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
