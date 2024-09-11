import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomerContext } from "../../Context/Context";
import { useEffect } from "react";

const NavBar = () => {
  const { customer, activeNavOption, handleLogoutCustomer } =
    useContext(CustomerContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navOptions = [
    { title: "Home", path: "/" },
    { title: "About", path: "/About" },
    { title: "Contact", path: "/Contact" },
    { title: "Services", path: "/Services" },
  ];
  // console.log(customer);
  return (
    <AppBar
      elevation={0}
      //   position="sticky"
      sx={{
        backgroundColor: scrollPosition > 20 ? "#00000075" : "transparent",
        color: "#000",
        transition: "0.8s ease",
        p: 2,
        position: "fixed",
        top: 0,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "#ffffff91",
                  fontWeight: "1000",
                  fontSize: "35px",
                }}
              >
                CargoX
              </span>
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              //   backgroundColor: "red",
              width: "50%",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            {navOptions.map((option, index) => (
              <Link
                to={option?.path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color:
                    activeNavOption == option?.path ? "#ff8b00" : "#ffffff91",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    transition: "0.5s ease",
                    "&:hover": {
                      color: "#ff8b00",
                      // backgroundColor: "#ffffff91",
                      p: 1,
                    },
                  }}
                >
                  {option?.title}
                </Box>
              </Link>
            ))}
            {customer && (
              <>
                {/* <Link
                  to={"/Profile"}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color:
                      activeNavOption == "/Profile" ? "#ff8b00" : "#ffffff91",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      transition: "0.5s ease",
                      "&:hover": {
                        color: "#ff8b00",
                        // backgroundColor: "#ffffff91",
                        p: 1,
                      },
                    }}
                  >
                    Profile
                  </Box>
                </Link> */}

                <Link
                  to={"/MyBookings"}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color:
                      activeNavOption == "/MyBookings"
                        ? "#ff8b00"
                        : "#ffffff91",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      transition: "0.5s ease",
                      "&:hover": {
                        color: "#ff8b00",
                        // backgroundColor: "#ffffff91",
                        p: 1,
                      },
                    }}
                  >
                    MyBookings
                  </Box>
                </Link>
              </>
            )}
            {customer ? (
              <Box
                onClick={handleLogoutCustomer}
                component="span"
                sx={{
                  fontWeight: "bold",
                  transition: "0.5s ease",
                  color: "#ffffff91",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#ff8b00",
                    // backgroundColor: "#ffffff91",
                    p: 1,
                  },
                }}
              >
                Logout
              </Box>
            ) : (
              <Link
                to={"/Login"}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    transition: "0.5s ease",
                    color: activeNavOption == "Login" ? "#ff8b00" : "#ffffff91",
                    "&:hover": {
                      color: "#ff8b00",
                      // backgroundColor: "#ffffff91",
                      p: 1,
                    },
                  }}
                >
                  Login
                </Box>
              </Link>
            )}
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ display: { md: "none" } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="home-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="services-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Services
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="about-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            About Us
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="why-us-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Why Us
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="testimonials-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Testimonials
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="blog-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Blog
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="contact-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Contact
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
