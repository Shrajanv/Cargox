import { Box } from "@mui/material";
import React from "react";
import Hero from "../Components/Home/Hero";
import AboutContent from "../Components/Home/AboutContent";
import PlainBanner from "../Components/Home/Banner";
import Special from "../Components/Home/Special";

export default function Home() {
  return (
    <Box>
      <Box>
        <Hero />
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
