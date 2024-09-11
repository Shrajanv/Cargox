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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff5c",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backdropFilter: "blur(7px)",
}));

export default function Login() {
  const { Login } = useContext(CompanyContext);
  const [formInfo, setFormInfo] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    Login(formInfo);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "100vh", sm: "100vh" },
        pt: 5,
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        // alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 7, pt: 20 }}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Item elevation={0}>
              <Box component={"form"} onSubmit={handleSubmit} sx={{ p: 4 }}>
                <Typography
                  sx={{ fontWeight: "bolder" }}
                  gutterBottom
                  variant="h5"
                >
                  Company SignIn
                </Typography>
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
                  sx={{ mb: 2 }}
                />
                <TextField
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                  label="Enter password"
                  type="password"
                  name="password"
                  required
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ p: 1 }}
                >
                  Sign In
                </Button>
                <Typography sx={{ mt: 2 }}>
                  Don't have an account?{" "}
                  <Link
                    to={"/company/Register"}
                    style={{ textDecoration: "none" }}
                  >
                    Sign Up
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
