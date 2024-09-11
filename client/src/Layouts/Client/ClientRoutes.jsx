import React from "react";

import NavBar from "./Components/NavBar/NavBar";
import { Box } from "@mui/material";
import Context from "./Context/Context";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import { useEffect } from "react";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import SingleService from "./Pages/SingleService";
import MyBookings from "./Pages/MyBookings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
export default function ClientRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    //scroll to top with smooth
    // setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // }, 3000);
  }, [pathname]);

  return (
    <Context>
      <Box>
        <NavBar />
      </Box>
      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Services" element={<Services />} />
          <Route exact path="/Service/:id" element={<SingleService />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/MyBookings" element={<MyBookings />} />
        </Routes>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Context>
  );
}
