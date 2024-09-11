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
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

export default function TableView({ data, host }) {
  const { updateCustomerStatus } = useContext(AdminContext);
  const handleUpdateStatus = (client, status) => {
    updateCustomerStatus(client?._id, status);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Profile</TableCell>
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
                    row?.status == "Active" ? "#e8f5e9" : "#ffebee",
                }}
              >
                <TableCell>
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row?.name}</Typography>
                  <Typography variant="caption">{row?.location}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{row?.phone}</Typography>
                  <Typography variant="caption">{row?.email}</Typography>
                </TableCell>
                <TableCell>
                  <img
                    style={{ width: "100px" }}
                    src={`${host}/uploads/admin/getImagesFromCustomer/${row?.profile}`}
                  />
                </TableCell>
                <TableCell>
                  {row?.status == "Active" ? (
                    <Button onClick={() => handleUpdateStatus(row, "Blocked")}>
                      Block
                    </Button>
                  ) : (
                    <Button onClick={() => handleUpdateStatus(row, "Active")}>
                      Unblock
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No client found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
