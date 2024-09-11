import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import PayForBooking from "./PayForBooking";
import Feedback from "./Feedback";

export default function BookingCard({ host, data }) {
  const { cancelBooking, confirmation, selectedItem, setSelectedItem } =
    useContext(CustomerContext);
  console.log(selectedItem);
  const handleCancel = (id) => {
    cancelBooking(id);
  };
  console.log(data);
  return (
    <Box sx={{ p: 1 }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "#07333c17",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "10%",
            p: 3,
          }}
        >
          <Box
            elevation={0}
            sx={{
              width: "100%",
              height: "10vh",
              backgroundImage: `url(${host}/uploads/customer/getImagesFromCompany/${data?.serviceId?.picture})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box>
            <Typography variant="body2">{data?.serviceId?.title}</Typography>
            <Typography variant="body2">
              service charge : ₹{data?.serviceId?.charge} onwards{" "}
            </Typography>
            <Typography variant="body2">
              final charge : <mark>₹{data?.charge} onwards </mark>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">
                Company : {data?.serviceId?.companyId?.name}{" "}
              </Typography>
              <Typography variant="caption">
                contact : {data?.serviceId?.companyId?.phone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              readOnly
              fullWidth
              value={data?.itemDescription}
              rows={2}
              multiline
              sx={{ border: "none" }}
            />
            <Typography variant="caption">
              Weight : {data?.overAllWeight}
            </Typography>
          </Box>
          {data?.status == "Accepted" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                readOnly
                fullWidth
                value={data?.response}
                rows={2}
                multiline
                sx={{ border: "none" }}
              />
              <Typography variant="caption">
                expected delivery date : {data?.expectedDeliveryDate}
              </Typography>
            </Box>
          )}
          <Box>
            <Chip
              color={
                data?.status == "Pending"
                  ? "warning"
                  : data?.status == "Completed"
                  ? "success"
                  : data?.status == "Rejected"
                  ? "error"
                  : "secondary"
              }
              label={data?.status}
            />
            <Chip
              color={
                data?.paymentStatus == "Initiated"
                  ? "warning"
                  : data?.paymentStatus == "Verified"
                  ? "success"
                  : "error"
              }
              label={`Payment ${data?.paymentStatus}`}
            />
          </Box>
          <Box>
            {data?.status == "Pending" ? (
              <Button color="error" onClick={() => handleCancel(data?._id)}>
                Cancel
              </Button>
            ) : data?.status == "Cancelled" ? (
              ""
            ) : data?.status == "Accepted" &&
              data?.paymentStatus != "Verified" ? (
              <Box>
                <PayForBooking data={data} />
                <Button color="error" onClick={() => handleCancel(data?._id)}>
                  Cancel
                </Button>
              </Box>
            ) : data?.status == "Completed" &&
              data?.paymentStatus == "Verified" &&
              !data?.feedback ? (
              <Feedback data={data} />
            ) : (
              ""
            )}
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
}
