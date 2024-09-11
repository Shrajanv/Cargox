import React from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
export default function Feedback({ data }) {
  const { feedbackForBooking } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    feedback: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormInfo({ feedback: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    feedbackForBooking(data?._id, formInfo);
    handleClose();
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} color="warning">
        Feedback
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component={"form"}
        onSubmit={handleSubmit}
        fullWidth
      >
        <DialogTitle>Submit feedback for your booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            submit your valuable feedback to improve our service
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="feedback"
            label="Feedback"
            placeholder="Type your feedback here"
            fullWidth
            multiline
            rows={2}
            variant="standard"
            value={formInfo.feedback}
            onChange={(e) =>
              setFormInfo({ ...formInfo, feedback: e.target.value })
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
