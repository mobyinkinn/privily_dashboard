// import React, { useState } from "react";

// const YourComponent = () => {
//   const [input, setInput] = useState("");

//   const fetchOtpdata = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/api/user/app-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phoneNumber: input,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Replace this with your navigation logic
//       console.log("Navigate to SplashScreen2");
//       console.log("response", data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Your Contact Details?</h1>
//       <p style={styles.description}>
//         We’ll Text You a Code to Verify Your Email or Number
//       </p>
//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           style={styles.input}
//           placeholder="Enter Your Email or Number*"
//           placeholderTextColor="#A9A9A9"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         {/* {!!error && <p style={styles.errorText}>{error}</p>} */}
//         <p style={styles.helpText}>please fill any one of them</p>
//       </div>
//       <button style={styles.button} onClick={fetchOtpdata}>
//         Let's Get Started
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//     padding: "20px",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   description: {
//     fontSize: "16px",
//     color: "#555",
//     marginBottom: "20px",
//     textAlign: "center",
//   },
//   inputContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   input: {
//     width: "300px",
//     padding: "10px",
//     fontSize: "16px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//     marginBottom: "10px",
//   },
//   helpText: {
//     fontSize: "14px",
//     color: "#A9A9A9",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     color: "#fff",
//     backgroundColor: "#007BFF",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   buttonText: {
//     fontWeight: "bold",
//   },
// };

// export default YourComponent;


// import React from 'react'
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
//   Box,
//   Typography,
//   Stack,
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// const podsData = [
//   {
//     id: "#101",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Available",
//   },
//   {
//     id: "#102",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Booked",
//   },
//   {
//     id: "#103",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Locked",
//   },
//   {
//     id: "#101",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Available",
//   },
//   {
//     id: "#102",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Booked",
//   },
//   {
//     id: "#103",
//     category: "Normal",
//     location: "Cape Town",
//     features: "Icons",
//     status: "Locked",
//   },
//   // Add more pods as necessary
// ];

// const Booking = () => {
//   return (
//     <>
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
//               <TableCell>Pod Id</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Features</TableCell>
//               <TableCell>Operation</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod.id}>
//                 <TableCell>{pod.id}</TableCell>
//                 <TableCell>{pod.category}</TableCell>
//                 <TableCell>{pod.location}</TableCell>
//                 <TableCell>{pod.features}</TableCell>
//                 <TableCell>
//                   <IconButton>
//                     <Visibility />
//                   </IconButton>
//                   <IconButton>
//                     <Download />
//                   </IconButton>
//                   <IconButton>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={
//                       pod.status === "Available"
//                         ? "success"
//                         : pod.status === "Booked"
//                         ? "primary"
//                         : "error"
//                     }
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.status}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// export default Booking


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
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// import axios from "axios";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// const Booking = () => {
//   const [podsData, setPodsData] = useState([]);

//   useEffect(() => {
//     const fetchPodsData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/user/all-bookings",
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODE3MzgzOSwiZXhwIjoxNzI2ODEzODM5fQ.-nSnQv1n3S3MlsKoWcsURJ3s8Kma8tJZRmH0kVFjdUY",
//             },
//           }
//         );
//         setPodsData(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchPodsData();
//   }, []);
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-CA", options); // 'en-CA' for YYYY-MM-DD format
//   };
//  const formatTime = (dateString) => {
//    const options = { hour: "2-digit", minute: "2-digit" };
//    const date = new Date(dateString);
//    return date.toLocaleTimeString("en-GB", options); // 'en-GB' for 24-hour format
//  };
//   return (
//     <>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Bookings
//       </Typography>
//       <Stack justifyContent={"space-between"} direction={"row"}>
//         <Stack direction={"row"}>
//           <Button
//             variant="contained"
//             sx={{
//               marginRight: 2,
//               backgroundColor: "#ED3327",
//               borderRadius: "20px",
//               "&:hover": {
//                 bgcolor: "#ED3327",
//               },
//             }}
//           >
//             All Pods ({podsData.length})
//           </Button>
//           <Button variant="outlined" startIcon={<AddIcon />}>
//             Add Pods
//           </Button>
//         </Stack>
//         <Button variant="outlined" startIcon={<GetAppIcon />}>
//           All Downloads
//         </Button>
//       </Stack>
//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Booking Id</TableCell>
//               <TableCell>Booking Date</TableCell>
//               <TableCell>booking Purpose</TableCell>
//               <TableCell>Booking Time</TableCell>
//               <TableCell>Operation</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod._id}>
//                 <TableCell>{pod.podId}</TableCell>
//                 <TableCell>{formatDate(pod.bookingDate)}</TableCell>
//                 <TableCell>{pod.bookingPurpose || "N/A"}</TableCell>
//                 <TableCell>{`${formatTime(pod.startTime)} - ${formatTime(
//                   pod.endTime
//                 )}`}</TableCell>
//                 <TableCell>
//                   <IconButton>
//                     <Visibility />
//                   </IconButton>
//                   <IconButton>
//                     <Download />
//                   </IconButton>
//                   <IconButton>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={
//                       pod.status === "Completed"
//                         ? "success"
//                         : pod.status === "Pending"
//                         ? "primary"
//                         : pod.status === "Processsing"
//                         ? "warning"
//                         : "error"
//                     }
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.status}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
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
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { Visibility, Download, Delete } from "@mui/icons-material";
import axios from "axios";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { CSVLink } from "react-csv";

const Booking = () => {
  const [podsData, setPodsData] = useState([]);

  useEffect(() => {
    const fetchPodsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/all-bookings",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODQ0OTg4OSwiZXhwIjoxNzI3MDg5ODg5fQ.xbalw4Td__E_lEMO0xuCFn_Vw5mJLoOMr5PASMEOt78",
            },
          }
        );
        setPodsData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPodsData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", options); // 'en-CA' for YYYY-MM-DD format
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", options); // 'en-GB' for 24-hour format
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

  return (
    <>
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
            All Pods ({podsData.length})
          </Button>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add Pods
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<GetAppIcon />}>
              Downlaod All
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
              <TableCell>Operation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {podsData.map((pod) => (
              <TableRow key={pod._id}>
                <TableCell>{pod.podId}</TableCell>
                <TableCell>{formatDate(pod.bookingDate)}</TableCell>
                <TableCell>{pod.bookingPurpose || "N/A"}</TableCell>
                <TableCell>{`${formatTime(pod.startTime)} - ${formatTime(
                  pod.endTime
                )}`}</TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  {/* <IconButton>
                    <Download />
                  </IconButton> */}
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
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
    </>
  );
};

export default Booking;
