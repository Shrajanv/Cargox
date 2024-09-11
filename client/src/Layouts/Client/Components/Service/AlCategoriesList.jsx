import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { Chip } from "@mui/material";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function AlCategoriesList({
  data,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Box>
      <Box sx={{ px: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Filter by category
        </Typography>
      </Box>
      <Box sx={{ gap: "2px", display: "flex", justifyContent: "flex-start" }}>
        <Chip
          label="All"
          size="small"
          variant={selectedCategory == "All" ? "contained" : "outlined"}
          sx={{
            p: 1,
            color: selectedCategory == "All" ? "white" : "#133f47c2",
            backgroundColor: selectedCategory == "All" ? "#133f47c2" : "white",
            fontWeight: "bold",
          }}
          onClick={() => setSelectedCategory("All")}
        />
        {data?.map((item, index) => (
          <Chip
            key={index}
            label={item.title}
            size="small"
            variant={selectedCategory == item?.title ? "contained" : "outlined"}
            sx={{
              p: 1,
              color: selectedCategory == item?.title ? "white" : "#133f47c2",
              backgroundColor:
                selectedCategory == item?.title ? "#133f47c2" : "white",
              fontWeight: "bold",
            }}
            onClick={() => setSelectedCategory(item?._id)}
          />
        ))}
      </Box>
    </Box>
  );
}
