import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Button, TextField, Typography } from "@mui/material";
export default function FeedbackTable({ data }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.email}</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    multiline
                    rows={2}
                    readOnly
                    fullWidth
                    value={row?.message}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No feedbacks found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
