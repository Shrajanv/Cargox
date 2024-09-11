import React, { useState, useContext, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { AdminContext } from "../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InsertForm() {
  const { insertCategory } = useContext(AdminContext);
  const [categoryInfo, setCategoryInfo] = useState({
    title: "",
    picture: null,
  });

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("title", categoryInfo.title);
    Data.append("picture", categoryInfo.picture);
    insertCategory(Data);
    // Reset the form state
    setCategoryInfo({
      title: "",
      picture: null,
    });
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    setCategoryInfo({ ...categoryInfo, picture: e.target.files[0] });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, pt: 2 }}>
        <Grid component={"form"} onSubmit={handleSubmit} container spacing={2}>
          <Grid item xs={5}>
            <TextField
              required
              title="title is required"
              onChange={(e) =>
                setCategoryInfo({ ...categoryInfo, title: e.target.value })
              }
              label="Enter category title"
              fullWidth
              type="text"
              name="title"
              value={categoryInfo.title}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              title="picture is required"
              onChange={handleFileChange}
              type="file"
              label="Upload category picture"
              fullWidth
              name="picture"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { accept: "image/*" } }}
              inputRef={fileInputRef}
            />
            {/* {categoryInfo.picture && (
              <Box mt={2}>
                <Typography variant="body2">
                  Selected file: {categoryInfo.picture.name}
                </Typography>
              </Box>
            )} */}
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" fullWidth variant="outlined" sx={{ p: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
