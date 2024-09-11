import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function TableView({ data, host, dashboard }) {
  const handleUpdate = (service) => {};
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booked on</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Client</TableCell>
            {!dashboard && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    row?.status == "Accepted" || row?.status == "Completed"
                      ? "#e8f5e9"
                      : "#ffebee",
                }}
              >
                <TableCell>
                  <Typography variant="body2">
                    {moment(row?.createdAt).format("DD-MM-YYYY")}
                  </Typography>
                  <Typography variant="caption">
                    Pickup Date{row?.pickupDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {row?.serviceId?.title}
                  </Typography>
                  <Typography variant="body2">₹{row?.charge}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {row?.customerId?.name}
                  </Typography>
                  <Typography variant="body2">
                    {row?.customerId?.phone}
                  </Typography>
                </TableCell>
                {!dashboard && (
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/company/Booking/${row?._id}`}
                    >
                      View
                    </Button>
                    {/* <Update data={row} /> */}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No service found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
