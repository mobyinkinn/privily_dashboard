

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
//   Stack,
//   Box,
//   Typography,
//   Skeleton,
//   CircularProgress,
// } from "@mui/material";
// import { CSVLink } from "react-csv";
// import axios from "axios";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";

// const Booking = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state for data fetching
//   const [verifying, setVerifying] = useState(true); // Add verifying state for user access
//   const [userVerified, setUserVerified] = useState(false);
//   const { verifyUser } = useAuth();
// const itemsPerPage = 6;
//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://privily.co/api/user/all-bookings",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJjYjRmZWRjZmU3M2U2N2U4NGY0MSIsImlhdCI6MTcyNjEzOTk0OCwiZXhwIjoxNzM0Nzc5OTQ4fQ.Uy0EDbnQ1clGLvZBjtPFhjQjx0PqngDsYLj2hUkBEQ4",
//           },
//         }
//       );
//       const sortedData = response.data.sort(
//         (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
//       );
//       setPodsData(sortedData);
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setLoading(false); // Set loading to false even if there's an error
//     }
//   };

//   useEffect(() => {
//     const effect = async () => {
//       setVerifying(true);
//       let res = await verifyUser(6);
//       setUserVerified(res);
//       setVerifying(false);
//       if (res) {
//         fetchPodsData();
//       }
//     };
//     effect();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-CA", options); // 'en-CA' for YYYY-MM-DD format
//   };

//   const formatTime = (dateString) => {
//     const options = { hour: "2-digit", minute: "2-digit" };
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-GB", options); // 'en-GB' for 24-hour format
//   };

//   const headers = [
//     { label: "Booking Id", key: "podId" },
//     { label: "Booking Date", key: "bookingDate" },
//     { label: "Booking Purpose", key: "bookingPurpose" },
//     { label: "Start Time", key: "startTime" },
//     { label: "End Time", key: "endTime" },
//     { label: "Status", key: "status" },
//   ];

//   const csvReport = {
//     filename: "User_Bookings_Report.csv",
//     headers: headers,
//     data: podsData,
//   };

//   if (verifying) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!userVerified) {
//     return <NoAccess />;
//   } else {
//     return (
//       <Box sx={{ padding: "43px 5px" }}>
//         <Typography
//           variant="h5"
//           fontWeight={"bold"}
//           sx={{ marginBottom: 2, color: "#ED3327" }}
//         >
//           Bookings
//         </Typography>
//         <Stack justifyContent={"space-between"} direction={"row"}>
//           <Stack direction={"row"}>
//             <Button
//               variant="contained"
//               sx={{
//                 marginRight: 2,
//                 backgroundColor: "#ED3327",
//                 borderRadius: "20px",
//                 "&:hover": {
//                   bgcolor: "#ED3327",
//                 },
//               }}
//             >
//               All Bookings ({podsData.length})
//             </Button>
//           </Stack>
//           <Stack direction={"row"} spacing={2}>
//             <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
//               <Button variant="outlined" startIcon={<GetAppIcon />}>
//                 Download All
//               </Button>
//             </CSVLink>
//           </Stack>
//         </Stack>
//         <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Booking Id</TableCell>
//                 <TableCell>Booking Date</TableCell>
//                 <TableCell>Booking Purpose</TableCell>
//                 <TableCell>Booking Time</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
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
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 : podsData.map((pod) => (
//                     <TableRow key={pod._id}>
//                       <TableCell>{pod.podId}</TableCell>
//                       <TableCell>{formatDate(pod.bookingDate)}</TableCell>
//                       <TableCell>{pod.bookingPurpose || "N/A"}</TableCell>
//                       <TableCell>{`${formatTime(pod.startTime)} - ${formatTime(
//                         pod.endTime
//                       )}`}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color={
//                             pod.status === "Completed"
//                               ? "success"
//                               : pod.status === "Pending"
//                               ? "primary"
//                               : pod.status === "Processing"
//                               ? "warning"
//                               : "error"
//                           }
//                           sx={{ borderRadius: "20px" }}
//                         >
//                           {pod.status}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     );
//   }
// };

// export default Booking;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Box,
  Typography,
  Skeleton,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { CSVLink } from "react-csv";
import axios from "axios";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import { fetchAllBookings } from "../api/api.js";
const Booking = () => {
  const [podsData, setPodsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

 const loadBookingsData = async () => {
   try {
     const data = await fetchAllBookings();
     const sortedData = data.sort(
       (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
     );
     setPodsData(sortedData);
     setLoading(false);
   } catch (error) {
     console.error("Error fetching data: ", error);
     setLoading(false);
   }
 };
  
  useEffect(() => {
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(6);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        loadBookingsData();
      }
    };
    effect();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", options);
  };

  const headers = [
    { label: "Booking Id", key: "podId" },
    { label: "Booking Date", key: "bookingDate" },
    { label: "Booking Purpose", key: "bookingPurpose" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Status", key: "status" },
  ];

  const csvReport = {
    filename: "User_Bookings_Report.csv",
    headers: headers,
    data: podsData,
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedBookings = podsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (verifying) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userVerified) {
    return <NoAccess />;
  } else {
    return (
      <Box sx={{ padding: "43px 5px" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "#ED3327" }}
        >
          Bookings
        </Typography>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Stack direction={"row"}>
            <Button
              variant="contained"
              sx={{
                marginRight: 2,
                backgroundColor: "#ED3327",
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: "#ED3327",
                },
              }}
            >
              All Bookings ({podsData.length})
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="outlined" startIcon={<GetAppIcon />}>
                Download All
              </Button>
            </CSVLink>
          </Stack>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking Id</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Booking Purpose</TableCell>
                <TableCell>Booking Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? [1, 2, 3, 4, 5].map((n) => (
                    <TableRow key={n}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : displayedBookings.map((pod) => (
                    <TableRow key={pod._id}>
                      <TableCell>{pod.podId}</TableCell>
                      <TableCell>{formatDate(pod.bookingDate)}</TableCell>
                      <TableCell>{pod.bookingPurpose || "N/A"}</TableCell>
                      <TableCell>{`${formatTime(pod.startTime)} - ${formatTime(
                        pod.endTime
                      )}`}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={
                            pod.status === "Completed"
                              ? "success"
                              : pod.status === "Pending"
                              ? "primary"
                              : pod.status === "Processing"
                              ? "warning"
                              : "error"
                          }
                          sx={{ borderRadius: "20px" }}
                        >
                          {pod.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(podsData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
    );
  }
};

export default Booking;
