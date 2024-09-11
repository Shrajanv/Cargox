import React, { useContext, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../Context/Context";
import bg2 from "../../Assets/bg2.jpg";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const images = {
  hero: bg2,
};

const SidebarSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const PostImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
  height: "70vh",
  // objectFit:"cover",
});

const CommentAvatar = styled(Avatar)({
  marginRight: "16px",
});

const ContactForm = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
});

const ServiceDetail = ({
  host,
  singleService,
  relatedServices,
  show,
  setShow,
}) => {
  const { customer, bookService } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({
    senderName: "",
    senderContact: "",
    pickupLocation: "",
    pickupLocationLink: "",
    pickupCountry: "",
    receiverName: "",
    receiverContact: "",
    deliveryLocation: "",
    deliveryLocationLink: "",
    deliveryCountry: "",
    itemDescription: "",
    overAllWeight: "",
    packagePicture: "",
    document: "",
    message: "",
    charge: "",
    pickupDate: "",
  });
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = "";
    if (name === "senderName" || name === "receiverName") {
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(value)) {
        error = "Name should only contain letters and spaces.";
      }
    } else if (name === "senderContact" || name === "receiverContact") {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value)) {
        error = "Phone number should be exactly 10 digits.";
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const error = validateInput(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    setFormInfo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formInfo).reduce((acc, key) => {
      const error = validateInput(key, formInfo[key]);
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const allData = new FormData();
    allData.append("senderName", formInfo.senderName);
    allData.append("senderContact", formInfo.senderContact);
    allData.append("pickupLocation", formInfo.pickupLocation);
    allData.append("pickupCountry", formInfo.pickupCountry);
    allData.append("pickupLocationLink", formInfo.pickupLocationLink);
    allData.append("receiverName", formInfo.receiverName);
    allData.append("receiverContact", formInfo.receiverContact);
    allData.append("deliveryLocation", formInfo.deliveryLocation);
    allData.append("deliveryCountry", formInfo.deliveryCountry);
    allData.append("deliveryLocationLink", formInfo.deliveryLocationLink);
    allData.append("itemDescription", formInfo.itemDescription);
    allData.append("overAllWeight", formInfo.overAllWeight);
    allData.append("packagePicture", formInfo.packagePicture);
    allData.append("document", formInfo.document);
    allData.append("message", formInfo.message);
    allData.append("charge", singleService?.charge);
    allData.append("pickupDate", formInfo.pickupDate);
    allData.append("serviceId", singleService?._id);
    bookService(allData);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", color: "#0e3a43" }}
              paragraph
            >
              {singleService?.title}
            </Typography>
            <Box mb={4}>
              <PostImage
                src={`${host}/uploads/customer/getImagesFromCompany/${singleService?.picture}`}
                alt="hero"
              />
            </Box>

            <Box mt={5}>
              <Typography color={"text.secondary"} variant="h6" gutterBottom>
                Category: {singleService?.categoryId?.title}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {singleService?.description}
            </Typography>
          </Box>
          {customer && (
            <Box>
              <Button
                sx={{ float: "right" }}
                color={show ? "error" : "secondary"}
                onClick={() => setShow(!show)}
                fullWidth
                variant="contained"
              >
                {show ? "Cancel" : "Book"}
              </Button>
            </Box>
          )}
          {show && (
            <Box
              component={"form"}
              onSubmit={handleSubmit}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Name"
                    required
                    name="senderName"
                    onChange={handleInputChange}
                    error={!!errors.senderName}
                    helperText={errors.senderName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Contact Number"
                    required
                    name="senderContact"
                    onChange={handleInputChange}
                    error={!!errors.senderContact}
                    helperText={errors.senderContact}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Service charge"
                    required
                    value={singleService?.charge}
                    name="charge"
                    disabled
                    helperText="Service charge may change based on your request"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Select pickup date"
                    required
                    name="pickupDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      inputProps: {
                        min: new Date().toISOString().split("T")[0],
                      },
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Enter Pickup Location"
                    required
                    name="pickupLocation"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Pickup Country</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Pickup Country"
                      name="pickupCountry"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"USA"}>USA</MenuItem>
                      <MenuItem value={"Canada"}>Canada</MenuItem>
                      <MenuItem value={"China"}>China</MenuItem>
                      <MenuItem value={"Germany"}>Germany</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"UAE"}>UAE</MenuItem>
                      <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                      <MenuItem value={"Japan"}>Japan</MenuItem>
                      <MenuItem value={"Australia"}>Australia</MenuItem>
                      <MenuItem value={"Netherlands"}>Netherlands</MenuItem>
                      <MenuItem value={"Singapore"}>Singapore</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Enter Location Link"
                    required
                    name="pickupLocationLink"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Receiver's Name"
                    required
                    name="receiverName"
                    onChange={handleInputChange}
                    error={!!errors.receiverName}
                    helperText={errors.receiverName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Receiver's Contact Number"
                    required
                    name="receiverContact"
                    onChange={handleInputChange}
                    error={!!errors.receiverContact}
                    helperText={errors.receiverContact}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Enter Delivery Location"
                    required
                    name="deliveryLocation"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Delivery Country</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Delivery Country"
                      name="deliveryCountry"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"USA"}>USA</MenuItem>
                      <MenuItem value={"Canada"}>Canada</MenuItem>
                      <MenuItem value={"China"}>China</MenuItem>
                      <MenuItem value={"Germany"}>Germany</MenuItem>
                      <MenuItem value={"India"}>India</MenuItem>
                      <MenuItem value={"UAE"}>UAE</MenuItem>
                      <MenuItem value={"United Kingdom"}>United Kingdom</MenuItem>
                      <MenuItem value={"Japan"}>Japan</MenuItem>
                      <MenuItem value={"Australia"}>Australia</MenuItem>
                      <MenuItem value={"Netherlands"}>Netherlands</MenuItem>
                      <MenuItem value={"Singapore"}>Singapore</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Enter Location Link"
                    required
                    name="deliveryLocationLink"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Item Description"
                    required
                    name="itemDescription"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Enter Overall Weight (Kg)"
                    required
                    name="overAllWeight"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2, float: "right" }}
                  >
                    Upload package picture
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      name="packagePicture"
                      onChange={handleInputChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 2, float: "right" }}
                  >
                    Upload Package Document
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      name="document"
                      onChange={handleInputChange}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    required
                    name="message"
                    multiline
                    rows={4}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <SidebarSection>
            <Typography variant="h6" gutterBottom>
              Related Services
            </Typography>
            <List>
              {relatedServices?.map((service) => (
                <ListItem
                  key={service._id}
                  component={Link}
                  to={`/services/${service._id}`}
                >
                  <ListItemAvatar>
                    <CommentAvatar
                      alt="service thumbnail"
                      src={`${host}/uploads/customer/getImagesFromCompany/${service.picture}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={service.title}
                    secondary={service.categoryId.title}
                  />
                </ListItem>
              ))}
            </List>
          </SidebarSection>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetail;
