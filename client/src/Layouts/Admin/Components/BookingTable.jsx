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
export default function BookingTable({ data }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booked on</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Charge</TableCell>
            <TableCell>Status</TableCell>
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
                  <Typography variant="body1">
                    {row?.customerId?.name}
                  </Typography>
                  <Typography variant="caption">
                    {row?.customerId?.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {row?.serviceId?.companyId?.name}
                  </Typography>
                  <Typography variant="caption">
                    {row?.serviceId?.companyId?.phone}
                  </Typography>
                </TableCell>

                <TableCell>₹{row?.charge}</TableCell>
                <TableCell>{row?.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No bookings found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
