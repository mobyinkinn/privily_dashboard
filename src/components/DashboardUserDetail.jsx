// import React from 'react'

// const DashboardUserDetail = () => {
//   return (
//     <div>DashboardUserDetail</div>
//   )
// }

// export default DashboardUserDetail



import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";

const DashboardUserDetail = ({ UserDetail }) => {
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(4); // Number of rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to the first page when rows per page changes
  };

  // Calculate the sliced data to show on the current page
  const paginatedTransactions = UserDetail.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: "43px 5px" }}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{ marginBottom: 2, color: "#ED3327" }}
      >
        User Details
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                User ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Full Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserDetail.map((feature) => (
              <TableRow key={feature._id}>
                <TableCell>{feature._id}</TableCell>
                <TableCell>
                  {feature.firstname} {feature.lastname}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={feature.isBlocked === false ? "success" : "error"}
                    sx={{ borderRadius: "20px" }}
                  >
                    {feature.isBlocked === false ? "active" : "Inactive"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={UserDetail.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 5, 10]} // Options for rows per page
        />
      </TableContainer>
    </Box>
  );
};

export default DashboardUserDetail;
