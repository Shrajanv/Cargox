import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Context/Context";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Components/NavBar/Navbar";
import Bookings from "./Pages/Bookings";
import Register from "./Pages/Register";
import Services from "./Pages/Services";
import BookingDetails from "./Pages/BookingDetails";
export default function CompanyRoutes() {
  const { pathname } = useLocation();

  return (
    <Context>
      <Box sx={{ display: "flex", backgroundColor: "#fff4ea" }}>
        {pathname != "/company/" &&
          pathname != "/company" &&
          pathname != "/company/Register" && <CssBaseline />}
        {pathname != "/company/" &&
          pathname != "/company" &&
          pathname != "/company/Register" && <Navbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "fff4ea",
            p:
              pathname != "/company/" &&
              pathname != "/company" &&
              pathname != "/company/Register"
                ? 1
                : 0,
          }}
        >
          {pathname != "/company/" &&
            pathname != "/company" &&
            pathname != "/company/Register" && <Toolbar />}
          <Box
            sx={{
              backgroundColor: "#fff4ea",
              minHeight: "100vh",
              p:
                pathname != "/company/" &&
                pathname != "/company" &&
                pathname != "/company/Register"
                  ? 1
                  : 0,
            }}
          >
            <Box sx={{}}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/Dashboard" element={<Dashboard />} />
                <Route exact path="/Services" element={<Services />} />
                <Route exact path="/Bookings" element={<Bookings />} />
                <Route exact path="/Booking/:id" element={<BookingDetails />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </Context>
  );
}
