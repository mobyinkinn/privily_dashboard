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
// } from "@mui/material";
// import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
// import axios from "axios";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { CSVLink } from "react-csv";

// const Features = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [open, setOpen] = useState(false);
//   const [newFeatureName, setNewFeatureName] = useState("");
//   const [error, setError] = useState("");
//   const [userVerified, setUserVerified] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const { verifyUser } = useAuth();
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [deleteUserId, setDeleteUserId] = useState(null);

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentFeature, setCurrentFeature] = useState(null);
//   const [editFeatureName, setEditFeatureName] = useState("");

//   const fetchFeatures = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/features",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setFeatures(response.data.data);
//       setLoading(false); // Set loading to false after data is fetched
//     } catch (error) {
//       console.error("Error fetching features:", error);
//       setLoading(false); // Set loading to false even if there's an error
//     }
//   };

//   const handleBlockUnblockUser = async (FeatureID, isBlocked) => {
//     try {
//       const url = isBlocked
//         ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/unblock-features/${FeatureID}`
//         : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/block-features/${FeatureID}`;
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
//       fetchFeatures(); // Refresh the user data
//     } catch (error) {
//       console.error(
//         `Error ${isBlocked ? "unblocking" : "blocking"} user: `,
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     const effect = async () => {
//       let res = await verifyUser(2);
//       setUserVerified(res);
//       if (res) {
//         fetchFeatures();
//       }
//     };
//     effect();
//   }, []);

//   const handleInputChange = (event) => {
//     setNewFeatureName(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/create-features",
//         { name: newFeatureName },
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Feature created successfully:", response.data);
//       setNewFeatureName("");
//       handleClose();
//       fetchFeatures();
//     } catch (error) {
//       console.error("Error creating feature:", error);
//       setError("Error creating feature");
//     }
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setError("");
//   };

//   const handleDeleteFeature = async () => {
//     try {
//       await axios.delete(
//         `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/delete-Location/${deleteUserId}`,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setModalMessage("Feature deleted successfully");
//       setModalOpen(true);
//       setConfirmModalOpen(false);
//       fetchFeatures(); // Refresh the user data
//     } catch (error) {
//       console.error("Error deleting feature: ", error);
//     }
//   };

//   const handleConfirmDelete = (userId) => {
//     setDeleteUserId(userId);
//     setConfirmModalOpen(true);
//   };

//   const confirmDelete = () => {
//     handleDeleteFeature();
//   };

//   const handleEditIconClick = (feature) => {
//     setCurrentFeature(feature);
//     setEditFeatureName(feature.name);
//     setEditModalOpen(true);
//   };

//   const handleEditInputChange = (event) => {
//     setEditFeatureName(event.target.value);
//   };

//   const handleEditSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/edit-feature/${currentFeature._id}`,
//         { name: editFeatureName, isBlocked: currentFeature.isBlocked },
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Feature updated successfully:", response.data);
//       setEditModalOpen(false);
//       fetchFeatures();
//     } catch (error) {
//       console.error("Error updating feature:", error);
//       setError("Error updating feature");
//     }
//   };

//   const headers = [
//     { label: "Id", key: "_id" },
//     { label: "Full Name", key: "name" },
//     { label: "Status", key: "isBlocked" },
//   ];

//   const csvReport = {
//     filename: "Features.csv",
//     headers: headers,
//     data: features,
//   };

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
//           Features
//         </Typography>
//         <Stack direction={"row"} justifyContent={"space-between"}>
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
//               All features ({features.length})
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={handleOpen}
//             >
//               Create Feature
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
//                 <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                   Id
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                   Full Name
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                   Status
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                   Operations
//                 </TableCell>
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
//                     </TableRow>
//                   ))
//                 : features.map((feature) => (
//                     <TableRow key={feature._id}>
//                       <TableCell>{feature._id}</TableCell>
//                       <TableCell>{feature.name}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color={
//                             feature.isBlocked === false ? "success" : "error"
//                           }
//                           sx={{ borderRadius: "20px" }}
//                         >
//                           {feature.isBlocked === false ? "active" : "Inactive"}
//                         </Button>
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => handleEditIconClick(feature)}
//                         >
//                           <Edit />
//                         </IconButton>
//                         <IconButton
//                           onClick={() =>
//                             handleBlockUnblockUser(
//                               feature._id,
//                               feature.isBlocked
//                             )
//                           }
//                         >
//                           {feature.isBlocked === false ? (
//                             <Visibility />
//                           ) : (
//                             <VisibilityOff />
//                           )}
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleConfirmDelete(feature._id)}
//                         >
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Modal
//           open={editModalOpen}
//           onClose={() => setEditModalOpen(false)}
//           aria-labelledby="edit-modal-title"
//           aria-describedby="edit-modal-description"
//         >
//           <Box
//             component="form"
//             onSubmit={handleEditSubmit}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "30%",
//               bgcolor: "background.paper",
//               boxShadow: 24,
//               borderRadius: 5,
//               p: 4,
//             }}
//           >
//             <Stack
//               direction={"row"}
//               alignItems={"center"}
//               justifyContent={"space-between"}
//             >
//               <Typography variant="h6" component="h2">
//                 Edit Feature
//               </Typography>
//               <CloseIcon
//                 onClick={() => setEditModalOpen(false)}
//                 sx={{ cursor: "pointer" }}
//               />
//             </Stack>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               label="Feature Name"
//               name="name"
//               value={editFeatureName}
//               onChange={handleEditInputChange}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Box
//               sx={{ mt: 2 }}
//               display={"flex"}
//               width={"100%"}
//               justifyContent={"center"}
//             >
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   width: "50%",
//                   backgroundColor: "#ED3327",
//                   "&:hover": { bgcolor: "#ED3327" },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         <Modal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               bgcolor: "background.paper",
//               border: "2px solid #000",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography id="modal-title" variant="h6" component="h2">
//               {modalMessage}
//             </Typography>
//             <Button onClick={() => setModalOpen(false)} sx={{ mt: 2 }}>
//               Close
//             </Button>
//           </Box>
//         </Modal>
//         <Modal
//           open={confirmModalOpen}
//           onClose={() => setConfirmModalOpen(false)}
//           aria-labelledby="confirm-modal-title"
//           aria-describedby="confirm-modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               bgcolor: "background.paper",
//               border: "2px solid #000",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography id="confirm-modal-title" variant="h6" component="h2">
//               Are you sure you want to delete this user?
//             </Typography>
//             <Button onClick={confirmDelete} sx={{ mt: 2, mr: 2 }}>
//               Yes
//             </Button>
//             <Button onClick={() => setConfirmModalOpen(false)} sx={{ mt: 2 }}>
//               No
//             </Button>
//           </Box>
//         </Modal>
//         <Modal open={open} onClose={handleClose}>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: "30%",
//               bgcolor: "background.paper",
//               boxShadow: 24,
//               borderRadius: 5,
//               p: 4,
//             }}
//           >
//             <Stack
//               direction={"row"}
//               alignItems={"center"}
//               justifyContent={"space-between"}
//             >
//               <Typography variant="h6" component="h2">
//                 Create New Feature
//               </Typography>
//               <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
//             </Stack>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               label="Feature Name"
//               name="name"
//               value={newFeatureName}
//               onChange={handleInputChange}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Box
//               sx={{ mt: 2 }}
//               display={"flex"}
//               width={"100%"}
//               justifyContent={"center"}
//             >
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   width: "50%",
//                   backgroundColor: "#ED3327",
//                   "&:hover": { bgcolor: "#ED3327" },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     );
//   }
// };

// export default Features;


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
  TextField,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import GetAppIcon from "@mui/icons-material/GetApp";
import { CSVLink } from "react-csv";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [open, setOpen] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [error, setError] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { verifyUser } = useAuth();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [verifying, setVerifying] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [editFeatureName, setEditFeatureName] = useState("");

  const fetchFeatures = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/features",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setFeatures(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching features:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleBlockUnblockUser = async (FeatureID, isBlocked) => {
    try {
      const url = isBlocked
        ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/unblock-features/${FeatureID}`
        : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/block-features/${FeatureID}`;
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
      fetchFeatures(); // Refresh the user data
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} user: `,
        error
      );
    }
  };

  useEffect(() => {
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(2);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        fetchFeatures();
      }
    };
    effect();
  }, []);

  const handleInputChange = (event) => {
    setNewFeatureName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/create-features",
        { name: newFeatureName },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      console.log("Feature created successfully:", response.data);
      setNewFeatureName("");
      handleClose();
      fetchFeatures();
    } catch (error) {
      console.error("Error creating feature:", error);
      setError("Error creating feature");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleDeleteFeature = async () => {
    try {
      await axios.delete(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/delete-Location/${deleteUserId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setModalMessage("Feature deleted successfully");
      setModalOpen(true);
      setConfirmModalOpen(false);
      fetchFeatures(); // Refresh the user data
    } catch (error) {
      console.error("Error deleting feature: ", error);
    }
  };

  const handleConfirmDelete = (userId) => {
    setDeleteUserId(userId);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteFeature();
  };

  const handleEditIconClick = (feature) => {
    setCurrentFeature(feature);
    setEditFeatureName(feature.name);
    setEditModalOpen(true);
  };

  const handleEditInputChange = (event) => {
    setEditFeatureName(event.target.value);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/edit-feature/${currentFeature._id}`,
        { name: editFeatureName, isBlocked: currentFeature.isBlocked },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      console.log("Feature updated successfully:", response.data);
      setEditModalOpen(false);
      fetchFeatures();
    } catch (error) {
      console.error("Error updating feature:", error);
      setError("Error updating feature");
    }
  };

  const headers = [
    { label: "Id", key: "_id" },
    { label: "Full Name", key: "name" },
    { label: "Status", key: "isBlocked" },
  ];

  const csvReport = {
    filename: "Features.csv",
    headers: headers,
    data: features,
  };
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
          Features
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
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
              All features ({features.length})
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Create Feature
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
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Id
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Full Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Operations
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [1, 2, 3, 4, 5].map((n) => (
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
                  </TableRow>
                ))
              ) : (
                features.map((feature) => (
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
                    <TableCell>
                      <IconButton onClick={() => handleEditIconClick(feature)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleBlockUnblockUser(feature._id, feature.isBlocked)
                        }
                      >
                        {feature.isBlocked === false ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleConfirmDelete(feature._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
        >
          <Box
            component="form"
            onSubmit={handleEditSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h6" component="h2">
                Edit Feature
              </Typography>
              <CloseIcon
                onClick={() => setEditModalOpen(false)}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Feature Name"
              name="name"
              value={editFeatureName}
              onChange={handleEditInputChange}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box
              sx={{ mt: 2 }}
              display={"flex"}
              width={"100%"}
              justifyContent={"center"}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "50%",
                  backgroundColor: "#ED3327",
                  "&:hover": { bgcolor: "#ED3327" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>

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
        <Modal open={open} onClose={handleClose}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h6" component="h2">
                Create New Feature
              </Typography>
              <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Feature Name"
              name="name"
              value={newFeatureName}
              onChange={handleInputChange}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box
              sx={{ mt: 2 }}
              display={"flex"}
              width={"100%"}
              justifyContent={"center"}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "50%",
                  backgroundColor: "#ED3327",
                  "&:hover": { bgcolor: "#ED3327" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
};

export default Features;
