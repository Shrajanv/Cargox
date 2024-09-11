import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import AboutContent from "../Components/Home/AboutContent";
import PlainBanner from "../Components/Home/Banner";
import Special from "../Components/Home/Special";

export default function About() {
  return (
    <Box>
      <Box>
        <PageBanner title="About Us" />
      </Box>
      <Box>
        <AboutContent />
      </Box>
      <Box>
        <PlainBanner />
      </Box>
      <Box>
        <Special />
      </Box>
    </Box>
  );
}
