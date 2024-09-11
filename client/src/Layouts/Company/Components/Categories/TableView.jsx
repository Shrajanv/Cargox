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
import Update from "./Update";
export default function TableView({
  data,
  host,
  SelectedService,
  setSelectedService,
  show,
  setShow,
}) {
  const handleUpdate = (service) => {
    setShow(true);
    setSelectedService(service);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Picture</TableCell>
            <TableCell>Action</TableCell>
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
                    row?.status == "Available" ? "#e8f5e9" : "#ffebee",
                }}
              >
                <TableCell>
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row?.title}</Typography>
                  <Typography variant="caption">
                    {row?.categoryId?.title}
                  </Typography>
                  <Typography variant="body2">₹{row?.charge}</Typography>
                </TableCell>
                <TableCell>
                  <img
                    style={{ width: "100px" }}
                    src={`${host}/uploads/company/${row?.picture}`}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(row)}>Update</Button>
                  {/* <Update data={row} /> */}
                </TableCell>
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
