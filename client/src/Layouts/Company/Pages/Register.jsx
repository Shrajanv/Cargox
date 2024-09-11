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
import { CompanyContext } from "../Context/Context";
import qr from "../Assets/qr.jpg"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff5c",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backdropFilter: "blur(7px)",
}));

export default function Register() {
  const { Register } = useContext(CompanyContext);
  const [formInfo, setFormInfo] = useState({});
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);

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

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 6-8 characters long and include at least one number, one uppercase letter, one lowercase letter, and one special character."
      );
    } else {
      setPasswordError("");
      setFormInfo({ ...formInfo, password });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formInfo.phone || formInfo.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    if (passwordError || nameError) {
      return;
    }

    console.log(formInfo);
    Register(formInfo);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "100vh", sm: "100vh" },
        pt: 5,
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
                  Company SignUp
                </Typography>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <TextField
                      onChange={handleNameChange}
                      fullWidth
                      label="Enter company name"
                      type="text"
                      name="name"
                      required
                      error={!!nameError}
                      helperText={nameError}
                    />
                  </Grid>
                  <Grid item sm={6}>
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
                  <Grid item sm={6}>
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
                    <TextField
                      onChange={(e) =>
                        setFormInfo({
                          ...formInfo,
                          [e.target.name]: e.target.value,
                        })
                      }
                      fullWidth
                      label="Enter license number"
                      name="licenseNumber"
                      required
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
                      label="Type company location here"
                      multiline
                      rows={2}
                      name="location"
                      required
                    />
                  </Grid>
                  <Box sx={{ p: 3, width: "110%" }}>
                    {show && (
                      <Box component={Paper} sx={{ width: "100%",p:3 }}>
                        <Grid item sm={12}>
                          <img src={qr} style={{ width: "200px" }} alt="" />
                        </Grid>
                        <Box sx={{p:1,display:"flex",gap:2}}>
                          <Grid item sm={6}>
                            <TextField
                              onChange={(e) =>
                                setFormInfo({
                                  ...formInfo,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              fullWidth
                              label="Enter the UPI transaction ID"
                              name="transactionId"
                              required
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextField
                              fullWidth
                              label="Registration Fee"
                              value={"5000"}
                              readOnly
                            />
                          </Grid>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {!show && (
                    <Grid item sm={12}>
                      <Button
                        onClick={() => setShow(!show)}
                        type="button"
                        variant="contained"
                        fullWidth
                        sx={{ p: 1 }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  )}
                  {show && (
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
                  )}
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
