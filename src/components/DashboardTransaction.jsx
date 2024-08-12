// import React from 'react'

// const DashboardTransaction = () => {
//   return (
//     <div>DashboardTransaction</div>
//   )
// }

// export default DashboardTransaction




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

// const DashboardTransaction = ({ Transaction }) => {
//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Transaction
//       </Typography>
//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                 merchantId
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

//             {Transaction.map((feature) => (
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

// export default DashboardTransaction;




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

const DashboardTransaction = ({ Transaction }) => {
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
  const paginatedTransactions = Transaction.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: "35px 5px 43px 5px" }}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{ marginBottom: 2, color: "#ED3327" }}
      >
        Transaction
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                merchantId
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
            {paginatedTransactions.map((feature) => (
              <TableRow key={feature._id}>
                <TableCell>{feature._id}</TableCell>
                <TableCell>{feature.paymentFacilitator}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ borderRadius: "20px" }}
                  >
                    {feature.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={Transaction.length}
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

export default DashboardTransaction;
