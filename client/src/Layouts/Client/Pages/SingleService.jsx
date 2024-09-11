import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ServiceDetail from "../Components/Service/ServiceDetail";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useState } from "react";

export default function SingleService() {
  const [show, setShow] = useState(false);
  const {
    host,
    getSingleService,
    singleService,
    allServices,
    viewAllServices,
  } = useContext(CustomerContext);
  const { id } = useParams();
  useEffect(() => {
    getSingleService(id);
    viewAllServices();
    show && setShow(false);
  }, [id]);
  const relatedServices = allServices
    ?.filter((item) => item?._id != id)
    .slice()
    .reverse()
    .slice(0, 4);
  return (
    <Box>
      <Box>
        <PageBanner title="Service Details" />
      </Box>
      <Box>
        <ServiceDetail
          relatedServices={relatedServices}
          singleService={singleService}
          host={host}
          show={show}
          setShow={setShow}
        />
      </Box>
    </Box>
  );
}
