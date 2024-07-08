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
// } from "@mui/material";
// import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";
// import axios from "axios";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// import { CSVLink } from "react-csv";

// const UserDetails = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   useEffect(() => {
//     fetchPodsData();
//   }, []);

//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/all-users",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       const filteredData = response.data.filter(
//         (user) => user.role !== "admin"
//       );
//       setPodsData(filteredData);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const handleBlockUnblockUser = async (userId, isBlocked) => {
//     try {
//       const url = isBlocked
//         ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/unblock-user/${userId}`
//         : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/block-user/${userId}`;
//       const response = await axios.put(
//         url,
//         {},
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setModalMessage(response.data.message);
//       setModalOpen(true);
//       fetchPodsData(); // Refresh the user data
//     } catch (error) {
//       console.error(
//         `Error ${isBlocked ? "unblocking" : "blocking"} user: `,
//         error
//       );
//     }
//   };

//   const headers = [
//     { label: "User Id", key: "podId" },
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

//   return (
//     <>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Users
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
//         <Stack direction={"row"} spacing={2}>
//           <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
//             <Button variant="outlined" startIcon={<GetAppIcon />}>
//               Download All
//             </Button>
//           </CSVLink>
//         </Stack>
//       </Stack>
//       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User Id</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Full Name</TableCell>
//               <TableCell>Mobile</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Operations</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod._id}>
//                 <TableCell>{pod._id}</TableCell>
//                 <TableCell>{pod.email || "N/A"}</TableCell>
//                 <TableCell>{pod.role || "N/A"}</TableCell>
//                 <TableCell>{`${pod.firstname} ${pod.lastname}`}</TableCell>
//                 <TableCell>{pod.mobile || "N/A"}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={pod.isBlocked === false ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.isBlocked === false ? "active" : "Inactive"}
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton
//                     onClick={() =>
//                       handleBlockUnblockUser(pod._id, pod.isBlocked)
//                     }
//                   >
//                     {pod.isBlocked === false ? (
//                       <Visibility />
//                     ) : (
//                       <VisibilityOff />
//                     )}
//                   </IconButton>
//                   <IconButton>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2">
//             {modalMessage}
//           </Typography>
//           <Button onClick={() => setModalOpen(false)} sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default UserDetails;

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
  Modal,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";
import axios from "axios";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { CSVLink } from "react-csv";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";

const UserDetails = () => {
  const [podsData, setPodsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(5);
      setUserVerified(res);
      if (res) {
        fetchPodsData();
      }
    };
    effect();
  }, []);

  const fetchPodsData = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/all-users",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      const filteredData = response.data.filter(
        (user) => user.role !== "admin"
      );
      setPodsData(filteredData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleBlockUnblockUser = async (userId, isBlocked) => {
    try {
      const url = isBlocked
        ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/unblock-user/${userId}`
        : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/block-user/${userId}`;
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setModalMessage(response.data.message);
      setModalOpen(true);
      fetchPodsData(); // Refresh the user data
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} user: `,
        error
      );
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/${deleteUserId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
        },
      });
      setModalMessage("User deleted successfully");
      setModalOpen(true);
      setConfirmModalOpen(false);
      fetchPodsData(); // Refresh the user data
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleConfirmDelete = (userId) => {
    setDeleteUserId(userId);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteUser();
  };

  const headers = [
    { label: "User Id", key: "podId" },
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
          Users
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
                Download All
              </Button>
            </CSVLink>
          </Stack>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Operations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {podsData.map((pod) => (
                <TableRow key={pod._id}>
                  <TableCell>{pod._id}</TableCell>
                  <TableCell>{pod.email || "N/A"}</TableCell>
                  <TableCell>{pod.role || "N/A"}</TableCell>
                  <TableCell>{`${pod.firstname} ${pod.lastname}`}</TableCell>
                  <TableCell>{pod.mobile || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={pod.isBlocked === false ? "success" : "error"}
                      sx={{ borderRadius: "20px" }}
                    >
                      {pod.isBlocked === false ? "active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleBlockUnblockUser(pod._id, pod.isBlocked)
                      }
                    >
                      {pod.isBlocked === false ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                    <IconButton onClick={() => handleConfirmDelete(pod._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {modalMessage}
            </Typography>
            <Button onClick={() => setModalOpen(false)} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
        <Modal
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="confirm-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this user?
            </Typography>
            <Button onClick={confirmDelete} sx={{ mt: 2, mr: 2 }}>
              Yes
            </Button>
            <Button onClick={() => setConfirmModalOpen(false)} sx={{ mt: 2 }}>
              No
            </Button>
          </Box>
        </Modal>
      </Box>
    );
  }
};

export default UserDetails;
