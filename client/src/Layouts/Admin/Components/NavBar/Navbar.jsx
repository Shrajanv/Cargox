import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Button, ListItemText } from "@mui/material";
import DonutSmallIcon from "@mui/icons-material/DonutSmallOutlined";
import StoreIcon from "@mui/icons-material/StoreOutlined";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import FeedbackIcon from "@mui/icons-material/FeedbackOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const drawerWidth = 240;
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    activeNavOption,
    setActiveNavOption,
    admin,
    host,
    handleLogoutAdmin,
  } = useContext(AdminContext);
  const handleClose = (condition) => {
    if (condition == "Logout") {
      handleLogoutAdmin();
    }
    setAnchorEl(null);
  };
  let navOptions = [
    {
      title: "Dashboard",
      path: "/admin/Dashboard",
      icon: <DonutSmallIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Companies",
      path: "/admin/Companies",
      icon: <StoreIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Clients",
      path: "/admin/Clients",
      icon: <GroupsIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Categories",
      path: "/admin/Categories",
      icon: <CategoryIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Bookings",
      path: "/admin/Bookings",
      icon: <ArticleIcon sx={{ fontSize: "20px" }} />,
    },
    {
      title: "Feedbacks",
      path: "/admin/Feedbacks",
      icon: <FeedbackIcon sx={{ fontSize: "20px" }} />,
    },
  ];
  // console.log(admin);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#fff4ea",
          // backgroundColor: "rgb(93, 95, 239)",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            pt: 1,
            pb: 1,
          }}
        >
          <Box
            sx={{
              minWidth: "15%",
              justifyContent: "space-between",
              display: "flex",
              backgroundColor: "#fff",
              p: 1,
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Avatar
              variant="square"
              src={`${host}/uploads/admin/${admin?.profile}`}
            />
            <Box>
              <Typography
                sx={{ color: "black", fontWeight: "bolder" }}
                variant="subtitle2"
              >
                {admin?.name}
              </Typography>
              <Typography
                sx={{ color: "black" }}
                variant="caption"
                color="text.secondary"
              >
                Admin
              </Typography>
            </Box>
            <ArrowDropDownIcon
              onClick={handleClick}
              sx={{ color: "black", fontWeight: "bolder", cursor: "pointer" }}
            />
          </Box>
          <Menu
            placement="bottom-start"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={() => handleClose("Logout")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        elevation={0}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            p: 2,
            backgroundColor: "#fff4ea",
            borderRight: "none",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              // fontFamily: "Poppins",
              fontWeight: "1000",
              fontSize: "35px",
            }}
          >
            Cargo<span style={{ color: "#ff8e29" }}>X</span>
          </Typography>
        </Toolbar>
        <List sx={{ backgroundColor: "" }}>
          {navOptions.map((text, index) => (
            <ListItem
              key={index}
              component={Link}
              to={text.path}
              sx={{
                color: "black",
                // opacity: activeNavOption == text.title ? "100%" : "50%",
              }}
            >
              <ListItemButton
                sx={{
                  backgroundColor: activeNavOption == text.title && "#ff8e29",
                  borderRadius: activeNavOption == text.title ? "10px" : "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeNavOption == text.title ? "white" : "#ff8e29",
                    p: 1,
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  color="text.secondary"
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        color:
                          activeNavOption == text.title ? "white" : "black",
                        fontSize: "13px",
                      }}
                    >
                      {text.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  );
}
