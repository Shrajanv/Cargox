import * as React from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import qr from "../../Assets/upiQr.png";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
export default function PayForBooking({ data }) {
  const { payForBooking } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    paymentStatus: "Initiated",
    transactionId: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormInfo({ ...formInfo, transactionId: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    payForBooking(data?._id, formInfo);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} color="warning">
        Pay
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component={"form"}
        onSubmit={handleSubmit}
        fullWidth
      >
        <DialogTitle>Pay for your booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Scan the QR code using upi, pay the amount and enter the transaction
            id you have received after the payment
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <img src={qr} style={{ width: "50%" }} alt="" />
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            name="transactionId"
            label="Enter the transaction Id"
            fullWidth
            variant="standard"
            value={formInfo.transactionId}
            onChange={(e) =>
              setFormInfo({ ...formInfo, transactionId: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
