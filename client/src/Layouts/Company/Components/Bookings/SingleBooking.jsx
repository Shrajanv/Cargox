import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import MapIcon from "@mui/icons-material/Map";
import pdf from "../../Assets/pdf.png";
import { useContext } from "react";
import { CompanyContext } from "../../Context/Context";

export default function SingleBooking({ host, data }) {
  const { updateBooking, updatePaymentStatus } = useContext(CompanyContext);
  const [formInfo, setFormInfo] = useState({
    charge: "",
    status: "",
    response: "",
    expectedDeliveryDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setFormInfo((prevFormInfo) => ({
        ...prevFormInfo,
        charge: data.charge || "",
        expectedDeliveryDate: data.expectedDeliveryDate || "",
        status: data.status || "",
        response: data.response || "",
      }));
    }
  }, [data]);

  const minExpectedDate = data?.pickupDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInfo.status) {
      setError("Please select a status.");
      return;
    } else {
      const finalData = {};
      if (formInfo.status == "Accepted") {
        finalData.status = "Accepted";
        finalData.charge = formInfo.charge;
        finalData.expectedDeliveryDate = formInfo.expectedDeliveryDate;
        finalData.response = formInfo.response;
      } else if (formInfo.status == "Completed") {
        finalData.status = "Completed";
        finalData.response = formInfo.response;
      } else {
        finalData.status = "Rejected";
        finalData.response = formInfo.response;
      }
      updateBooking(data?._id, finalData);
      setError("");
    }

    // You can now send `finalData` to the server or further process it
  };
  const handleUpdatePaymentStatus = (paymentStatus) => {
    updatePaymentStatus(data?._id, paymentStatus);
  };
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary">
                Client Info <small>(Booked by)</small>
              </Typography>
            </Box>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data?.customerId?.name}</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>{data?.customerId?.phone}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">Sender Info</Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data?.senderName}</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>{data?.senderContact}</TableCell>
            <TableCell>Pick-up Date</TableCell>
            <TableCell>{data?.pickupDate}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">Receiver Info</Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data?.receiverName}</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>{data?.receiverContact}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          gap: "2%",
        }}
      >
        <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={0}>
          <Box>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Pick-up Point
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={data?.pickupLocation}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Country"
                  secondary={data?.pickupCountry}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Location Link"
                  secondary={
                    <Link
                      style={{ textDecoration: "none" }}
                      to={data?.pickupLocationLink}
                      target="_blank"
                    >
                      {data?.pickupLocationLink}
                    </Link>
                  }
                />
              </ListItemButton>
            </List>
          </Box>
        </Paper>
        <Paper sx={{ width: "100%", borderRadius: "20px" }} elevation={0}>
          <Box>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Delivery Point
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={data?.deliveryLocation}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Country"
                  secondary={data?.deliveryCountry}
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Location Link"
                  secondary={
                    <Link
                      style={{ textDecoration: "none" }}
                      to={data?.deliveryLocationLink}
                      target="_blank"
                    >
                      {data?.deliveryLocationLink}
                    </Link>
                  }
                />
              </ListItemButton>
            </List>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">Package Info</Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Package Description</TableCell>
            <TableCell>
              <TextField
                value={data?.itemDescription}
                fullWidth
                readOnly
                multiline
                rows={2}
                disabled
              />
            </TableCell>
            <TableCell>Overall Weight</TableCell>
            <TableCell>{data?.overAllWeight}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {data?.message && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell colSpan={3}>
                <TextField
                  value={data?.message}
                  fullWidth
                  readOnly
                  multiline
                  rows={2}
                  disabled
                />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          gap: "2%",
        }}
      >
        <Paper
          sx={{ width: "300px", borderRadius: "20px", p: 4 }}
          elevation={0}
        >
          <Box>
            <Typography color="text.secondary" sx={{ fontWeight: "600" }}>
              Package picture
            </Typography>
          </Box>
          <Box>
            <img
              src={`${host}/uploads/company/getImagesFromCustomerBooking/${data?.packagePicture}`}
              alt="packagePicture"
              style={{ width: "100%" }}
            />
          </Box>
        </Paper>
        <Paper
          sx={{ width: "300px", borderRadius: "20px", p: 4 }}
          elevation={0}
        >
          <Box>
            <Typography color="text.secondary" sx={{ fontWeight: "600" }}>
              Package document
            </Typography>
          </Box>
          <Box
            component={Link}
            to={`${host}/uploads/company/getImagesFromCustomerBooking/${data?.document}`}
            target="_blank"
          >
            <img src={pdf} alt="packageDocument" style={{ width: "100%" }} />
          </Box>
        </Paper>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">Service Info</Typography>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data?.serviceId?.title}</TableCell>
            <TableCell>Charge</TableCell>
            <TableCell>₹{data?.serviceId?.charge}</TableCell>
            <TableCell>Booking Status</TableCell>
            <TableCell>
              <Chip
                color={
                  data?.status == "Pending"
                    ? "warning"
                    : data?.status == "Completed"
                    ? "success"
                    : data?.status == "Rejected"
                    ? "error"
                    : "secondary"
                }
                label={data?.status}
                size="small"
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {data?.transactionId && (
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary">Payment Info</Typography>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction Id</TableCell>
                <TableCell>{data?.transactionId}</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>
                  <Chip
                    color={
                      data?.paymentStatus == "Initiated"
                        ? "warning"
                        : data?.paymentStatus == "Verified"
                        ? "success"
                        : "error"
                    }
                    label={data?.paymentStatus}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {data?.status != "Completed" && (
                    <Box>
                      <IconButton
                        onClick={() => handleUpdatePaymentStatus("Verified")}
                      >
                        <VerifiedIcon
                          sx={{ fontSize: "30px" }}
                          color="success"
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => handleUpdatePaymentStatus("Denied")}
                      >
                        <NewReleasesIcon
                          sx={{ fontSize: "30px" }}
                          color="error"
                        />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Box>
      )}

      {data?.feedback && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feedback</TableCell>
              <TableCell colSpan={3}>
                <TextField
                  value={data?.feedback}
                  fullWidth
                  readOnly
                  multiline
                  rows={2}
                  disabled
                />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      )}

      {data?.status != "Completed" && (
        <Box component={"form"} onSubmit={handleSubmit} sx={{ m: 2 }}>
          <FormControl>
            <FormLabel id="status-radio-buttons-group-label">
              Updated Status
            </FormLabel>
            <RadioGroup
              aria-labelledby="status-radio-buttons-group-label"
              name="status"
              value={formInfo.status}
              required
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  status: e.target.value,
                })
              }
            >
              <FormControlLabel
                value="Accepted"
                control={<Radio />}
                label="Accept"
              />
              {data?.status == "Accepted" ? (
                <FormControlLabel
                  value="Completed"
                  control={<Radio />}
                  label="Complete"
                />
              ) : (
                <FormControlLabel
                  value="Rejected"
                  control={<Radio />}
                  label="Reject"
                />
              )}
            </RadioGroup>
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
          </FormControl>
          {formInfo.status === "Accepted" && (
            <Box sx={{ mb: 1, mt: 2, display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Final charge"
                name="charge"
                required
                type="number"
                value={formInfo.charge}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    charge: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                InputProps={{
                  inputProps: {
                    min: minExpectedDate,
                  },
                }}
                label="Select expected Delivery Date"
                type="date"
                name="expectedDeliveryDate"
                required
                value={formInfo.expectedDeliveryDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormInfo({
                    ...formInfo,
                    expectedDeliveryDate: e.target.value,
                  })
                }
              />
            </Box>
          )}
          <TextField
            fullWidth
            value={formInfo.response}
            name="response"
            required
            label="Your response"
            placeholder="Type your response here"
            onChange={(e) =>
              setFormInfo({
                ...formInfo,
                response: e.target.value,
              })
            }
          />
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              type="submit"
              sx={{ backgroundColor: "#ff8e29" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </TableContainer>
  );
}
