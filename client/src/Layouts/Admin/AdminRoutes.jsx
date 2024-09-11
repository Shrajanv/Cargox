import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Context/Context";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Components/NavBar/Navbar";
import Categories from "./Pages/Categories";
import Companies from "./Pages/Companies";
import Clients from "./Pages/Clients";
import Bookings from "./Pages/Bookings";
import Feedbacks from "./Pages/Feedbacks";

export default function AdminRoutes() {
  const { pathname } = useLocation();
  return (
    <Context>
      <Box sx={{ display: "flex", backgroundColor: "#fff4ea" }}>
        {pathname != "/admin/" && pathname != "/admin" && <CssBaseline />}
        {pathname != "/admin/" && pathname != "/admin" && <Navbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "fff4ea",
            p: pathname != "/admin/" && pathname != "/admin" ? 1 : 0,
          }}
        >
          {pathname != "/admin/" && pathname != "/admin" && <Toolbar />}
          <Box
            sx={{
              backgroundColor: "#fff4ea",
              minHeight: "100vh",
              p: pathname != "/admin/" && pathname != "/admin" ? 1 : 0,
            }}
          >
            <Box sx={{}}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Dashboard" element={<Dashboard />} />
                <Route exact path="/Categories" element={<Categories />} />
                <Route exact path="/Companies" element={<Companies />} />
                <Route exact path="/Clients" element={<Clients />} />
                <Route exact path="/Bookings" element={<Bookings />} />
                <Route exact path="/Feedbacks" element={<Feedbacks />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </Context>
  );
}
