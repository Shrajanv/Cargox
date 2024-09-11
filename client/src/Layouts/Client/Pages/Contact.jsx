import React from "react";
import { Box } from "@mui/material";
import PageBanner from "../Components/PageBanner";
import ContactContent from "../Components/Contact/ContactContent";

export default function Contact() {
  return (
    <Box>
      <Box>
        <PageBanner title="Contact Us" />
      </Box>
      <Box>
        <ContactContent />
      </Box>
    </Box>
  );
}
