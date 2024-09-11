import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { CustomerContext } from "../../Context/Context";

const ContactContent = () => {
  const { submitContactFeedback } = useContext(CustomerContext);
  const [contactFormInfo, setContactFormInfo] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name" && !validateName(value)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should contain only letters and spaces",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateName(contactFormInfo.name)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name should contain only letters and spaces",
      }));
      return;
    }
    submitContactFeedback(contactFormInfo);
    setContactFormInfo({ name: "", email: "", message: "" });
  };

  return (
    <Box id="contact-section" sx={{ py: 8, bgcolor: "background.default" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={contactFormInfo.name}
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={contactFormInfo.email}
                    fullWidth
                    label="Email address"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    type="text"
                    name="message"
                    value={contactFormInfo.message}
                    fullWidth
                    label="Write your message"
                    variant="outlined"
                    multiline
                    rows={3}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ py: 2, backgroundColor: "#113a41" }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6} lgOffset={1}>
            <Paper
              elevation={0}
              sx={{ p: 3, mt: { xs: 4, lg: 0 } }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                  Get in touch
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
  At CargoX, we pride ourselves on delivering a seamless logistics experience through our state-of-the-art platform. Our system is designed to offer real-time tracking, efficient booking, and comprehensive management of your shipments. We understand the complexities of logistics and strive to simplify the process for our users, ensuring that each step from booking to delivery is handled with precision. By combining innovative technology with exceptional customer support, CargoX provides a reliable solution that meets the needs of both businesses and individual clients. Trust us to enhance your logistics operations and keep your cargo on track.
</Typography>

              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactContent;
