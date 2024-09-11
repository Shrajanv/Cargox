import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

export default function Update({ data }) {
  const { updateCategory } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("title", updatedData.title);
    Data.append("picture", updatedData.picture);
    Data.append("status", updatedData.status);
    updateCategory(data?._id, Data);
    // Reset the form state
    setUpdatedData({
      title: "",
      picture: null,
    });
    handleClose();
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    setUpdatedData({ ...updatedData, picture: e.target.files[0] });
  };

  useEffect(() => {
    setUpdatedData(data);
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        component={"form"}
        onSubmit={handleSubmit}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the category info</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            onChange={(e) => {
              setUpdatedData({ ...updatedData, title: e.target.value });
            }}
            label="Category title"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={updatedData?.title}
            variant="standard"
            sx={{ mt: 1 }}
          />
          <TextField
            // required
            title="picture is required"
            onChange={handleFileChange}
            type="file"
            variant="standard"
            sx={{ mt: 1, mb: 2 }}
            label="Upload category picture"
            fullWidth
            name="picture"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { accept: "image/*" } }}
            inputRef={fileInputRef}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={updatedData?.status || ""}
              label="Update status"
              variant="standard"
              sx={{ mt: 5 }}
              onChange={(e) => {
                setUpdatedData({ ...updatedData, status: e.target.value });
              }}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
