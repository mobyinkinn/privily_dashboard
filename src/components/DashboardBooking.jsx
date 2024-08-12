
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Typography,
//   Stack,
//   Modal,
//   Box,
//   TextField,
//   Skeleton,
//   CircularProgress,
// } from "@mui/material";

// const DashboardBooking = ({ Booking }) => {
//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Bookings
//       </Typography>
//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                 Id
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                 Full Name
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* {loading
//                 ? [1, 2, 3, 4, 5].map((n) => (
//                     <TableRow key={n}>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                     </TableRow>
//                   )) */}

//             {Booking.map((feature) => (
//               <TableRow key={feature._id}>
//                 <TableCell>{feature._id}</TableCell>
//                 <TableCell>{feature.name}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={feature.isBlocked === false ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {feature.isBlocked === false ? "active" : "Inactive"}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default DashboardBooking;
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

const DashboardBooking = ({ Booking }) => {
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
  const paginatedBookings = Booking.slice(
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
        Bookings
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Id
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
            {paginatedBookings.map((feature) => (
              <TableRow key={feature._id}>
                <TableCell>{feature._id}</TableCell>
                <TableCell>{feature.name}</TableCell>
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
          count={Booking.length}
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

export default DashboardBooking;
