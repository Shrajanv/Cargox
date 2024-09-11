import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from "@mui/material";
import bg2 from "../../Assets/bg2.jpg";
import { Link } from "react-router-dom";
const FeaturedCard = styled(Card)(({ theme }) => ({}));

const GradientOverlay = styled(Box)(({ theme }) => ({}));

const ServiceCard = ({ data, host }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 445, m: 1, borderRadius: "20px" }}>
      <CardActionArea component={Link} to={`/Service/${data?._id}`}>
        <Box
          sx={{
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundImage: `url(${host}/uploads/customer/getImagesFromCompany/${data?.picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            color: "white",
          }}
        >
          <GradientOverlay
            sx={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 2,
              borderRadius: "20px",
              transition: "0.7s ease-in-out",
              "&:hover": {
                backgroundColor: "#0000004f",
              },
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  textDecoration: "none",
                  transition: "0.7s ease-in-out",
                  "&:hover": {
                    backgroundColor: "white",
                    textDecoration: "underline",
                    color: "black",
                    fontWeight: "600",
                  },
                }}
                variant="h5"
                component="h2"
              >
                {data?.title}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                By {data?.companyId?.name}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                starts from ₹{data?.charge}
              </Typography>
            </CardContent>
          </GradientOverlay>
        </Box>
      </CardActionArea>
    </Box>
  );
};

export default ServiceCard;
