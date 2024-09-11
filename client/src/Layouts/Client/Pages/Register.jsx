import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import loginBg from "../Assets/loginBg.jpg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CustomerContext } from "../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff5c",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backdropFilter: "blur(7px)",
}));

export default function Register() {
  const { Register } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({});
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) {
      setNameError("Please enter only alphabetical characters.");
    } else {
      setNameError("");
      setFormInfo({ ...formInfo, name });
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;

    if (phone.length > 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
    } else {
      setPhoneError("");
      setFormInfo({ ...formInfo, phone });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormInfo({ ...formInfo, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = formInfo.password;
    const phone = formInfo.phone;

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 6-8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    if (phone?.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    setPasswordError("");
    setPhoneError("");

    console.log(formInfo);
    Register(formInfo);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "100vh", sm: "100vh" },
        pt: 10,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 7, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item sm={5} xs={12}>
            <Item elevation={0}>
              <Box component={"form"} onSubmit={handleSubmit} sx={{ p: 4 }}>
                <Typography
                  sx={{ fontWeight: "bolder" }}
                  gutterBottom
                  variant="h5"
                >
                  Customer SignUp
                </Typography>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <TextField
                      onChange={handleNameChange}
                      fullWidth
                      label="Enter name"
                      type="text"
                      name="name"
                      required
                      error={!!nameError}
                      helperText={nameError}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      onChange={handlePhoneChange}
                      fullWidth
                      label="Enter contact number"
                      type="number"
                      name="phone"
                      required
                      error={!!phoneError}
                      helperText={phoneError}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      onChange={(e) =>
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        })
                      }
                      fullWidth
                      label="Enter email id"
                      type="email"
                      name="email"
                      required
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      onChange={handlePasswordChange}
                      fullWidth
                      label="Enter password"
                      type="password"
                      name="password"
                      required
                      error={!!passwordError}
                      helperText={passwordError}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ p: 1 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Typography sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <Link to={"/company"} style={{ textDecoration: "none" }}>
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
