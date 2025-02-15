

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
// import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
// import axios from "axios";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { CSVLink } from "react-csv";
// import {
//   fetchFeatures,
//   blockFeature,
//   unblockFeature,
//   createFeature,
//   editFeature,
//   deleteFeature,
// } from "../api/api.js";
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
//   const [deleteFeatureId, setDeleteFeatureId] = useState(null);
//   const [verifying, setVerifying] = useState(true);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [currentFeature, setCurrentFeature] = useState(null);
//   const [editFeatureName, setEditFeatureName] = useState("");

//  const loadFeatures = async () => {
//    try {
//      const data = await fetchFeatures();
//      setFeatures(data);
//      setLoading(false);
//    } catch (error) {
//      console.error("Error fetching features:", error);
//      setLoading(false);
//    }
//  };

//  const handleBlockUnblockFeature = async (featureID, isBlocked) => {
//    try {
//      let response;
//      if (isBlocked) {
//        response = await unblockFeature(featureID);
//      } else {
//        response = await blockFeature(featureID);
//      }
//      setModalMessage(response.message || "Operation successful");
//      setModalOpen(true);
//      loadFeatures(); // Refresh the features data
//    } catch (error) {
//      console.error(
//        `Error ${isBlocked ? "unblocking" : "blocking"} feature: `,
//        error
//      );
//    }
//  };

//  useEffect(() => {
//    const effect = async () => {
//      setVerifying(true);
//      let res = await verifyUser(2);
//      setUserVerified(res);
//      setVerifying(false);
//      if (res) {
//        loadFeatures();
//      }
//    };
//    effect();
//  }, []);

//  const handleInputChange = (event) => {
//    setNewFeatureName(event.target.value);
//  };

//  const handleSubmit = async (event) => {
//    event.preventDefault();
//    try {
//      const response = await createFeature({ name: newFeatureName });
//      console.log("Feature created successfully:", response);
//      setNewFeatureName("");
//      handleClose();
//      loadFeatures();
//    } catch (error) {
//      console.error("Error creating feature:", error);
//      setError("Error creating feature");
//    }
//  };

//  const handleOpen = () => {
//    setOpen(true);
//  };

//  const handleClose = () => {
//    setOpen(false);
//    setError("");
//  };

//  const handleDeleteFeature = async () => {
//    try {
//      const response = await deleteFeature(deleteFeatureId);
//      setModalMessage("Feature deleted successfully");
//      setModalOpen(true);
//      setConfirmModalOpen(false);
//      loadFeatures();
//    } catch (error) {
//      console.error("Error deleting feature: ", error);
//    }
//  };

//  const handleConfirmDelete = (featureId) => {
//    setDeleteFeatureId(featureId);
//    setConfirmModalOpen(true);
//  };

//  const confirmDelete = () => {
//    handleDeleteFeature();
//  };

//  const handleEditIconClick = (feature) => {
//    setCurrentFeature(feature);
//    setEditFeatureName(feature.name);
//    setEditModalOpen(true);
//  };

//  const handleEditInputChange = (event) => {
//    setEditFeatureName(event.target.value);
//  };

//  const handleEditSubmit = async (event) => {
//    event.preventDefault();
//    try {
//      const response = await editFeature(currentFeature._id, {
//        name: editFeatureName,
//        isBlocked: currentFeature.isBlocked,
//      });
//      console.log("Feature updated successfully:", response);
//      setEditModalOpen(false);
//      loadFeatures();
//    } catch (error) {
//      console.error("Error updating feature:", error);
//      setError("Error updating feature");
//    }
//  };

//  const headers = [
//    { label: "Id", key: "_id" },
//    { label: "Full Name", key: "name" },
//    { label: "Status", key: "isBlocked" },
//  ];

//  const csvReport = {
//    filename: "Features.csv",
//    headers: headers,
//    data: features,
//  };

//  if (verifying) {
//    return (
//      <Box
//        sx={{
//          display: "flex",
//          justifyContent: "center",
//          alignItems: "center",
//          height: "100vh",
//        }}
//      >
//        <CircularProgress />
//      </Box>
//    );
//  }
//  if (verifying) {
//    return (
//      <Box
//        sx={{
//          display: "flex",
//          justifyContent: "center",
//          alignItems: "center",
//          height: "100vh",
//        }}
//      >
//        <CircularProgress />
//      </Box>
//    );
//  }
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
//                             handleBlockUnblockFeature(
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
// import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { CSVLink } from "react-csv";
// import {
//   fetchFeatures,
//   blockFeature,
//   unblockFeature,
//   createFeature,
//   editFeature,
//   deleteFeature,
// } from "../api/api.js";

// const Features = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [newFeatureName, setNewFeatureName] = useState("");
//   const [error, setError] = useState("");
//   const [userVerified, setUserVerified] = useState(false);
//   const { verifyUser } = useAuth();
//   const [verifying, setVerifying] = useState(true);

//   const loadFeatures = async () => {
//     try {
//       const data = await fetchFeatures();
//       setFeatures(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching features:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const effect = async () => {
//       setVerifying(true);
//       let res = await verifyUser(2);
//       setUserVerified(res);
//       setVerifying(false);
//       if (res) {
//         loadFeatures();
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
//       const response = await createFeature({ name: newFeatureName });
//       setNewFeatureName("");
//       handleClose();
//       loadFeatures();
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

//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(features);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setFeatures(items);
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
//           Features
//         </Typography>
//         <Stack direction={"row"} justifyContent={"space-between"}>
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Feature
//           </Button>
//           <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
//             <Button variant="outlined" startIcon={<GetAppIcon />}>
//               Download All
//             </Button>
//           </CSVLink>
//         </Stack>
//         <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//           <DragDropContext onDragEnd={handleOnDragEnd}>
//             <Droppable droppableId="features">
//               {(provided) => (
//                 <Table {...provided.droppableProps} ref={provided.innerRef}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Id
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Full Name
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Status
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Operations
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loading
//                       ? [1, 2, 3, 4, 5].map((n) => (
//                           <TableRow key={n}>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       : features.map((feature, index) => (
//                           <Draggable
//                             key={feature._id}
//                             draggableId={feature._id}
//                             index={index}
//                           >
//                             {(provided) => (
//                               <TableRow
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 ref={provided.innerRef}
//                               >
//                                 <TableCell>{feature._id}</TableCell>
//                                 <TableCell>{feature.name}</TableCell>
//                                 <TableCell>
//                                   <Button
//                                     variant="contained"
//                                     color={
//                                       feature.isBlocked === false
//                                         ? "success"
//                                         : "error"
//                                     }
//                                     sx={{ borderRadius: "20px" }}
//                                   >
//                                     {feature.isBlocked === false
//                                       ? "Active"
//                                       : "Inactive"}
//                                   </Button>
//                                 </TableCell>
//                                 <TableCell>
//                                   <IconButton>
//                                     <Edit />
//                                   </IconButton>
//                                   <IconButton>
//                                     {feature.isBlocked === false ? (
//                                       <Visibility />
//                                     ) : (
//                                       <VisibilityOff />
//                                     )}
//                                   </IconButton>
//                                   <IconButton>
//                                     <Delete />
//                                   </IconButton>
//                                 </TableCell>
//                               </TableRow>
//                             )}
//                           </Draggable>
//                         ))}
//                     {provided.placeholder}
//                   </TableBody>
//                 </Table>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </TableContainer>
//       </Box>
//     );
//   }
// };

// export default Features;


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
// import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { CSVLink } from "react-csv";
// import {
//   fetchFeatures,
//   blockFeature,
//   unblockFeature,
//   createFeature,
//   editFeature,
//   deleteFeature,
// } from "../api/api.js";

// const Features = () => {
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [newFeatureName, setNewFeatureName] = useState("");
//   const [error, setError] = useState("");
//   const [userVerified, setUserVerified] = useState(false);
//   const { verifyUser } = useAuth();
//   const [verifying, setVerifying] = useState(true);

//   const loadFeatures = async () => {
//     try {
//       const data = await fetchFeatures();
//       // Sort features by 'order' to display them in the correct order
//       const sortedData = data.sort((a, b) => a.order - b.order);
//       setFeatures(sortedData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching features:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const effect = async () => {
//       setVerifying(true);
//       let res = await verifyUser(2);
//       setUserVerified(res);
//       setVerifying(false);
//       if (res) {
//         loadFeatures();
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
//       const response = await createFeature({ name: newFeatureName });
//       setNewFeatureName("");
//       handleClose();
//       loadFeatures();
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

//   const handleOnDragEnd = async (result) => {
//     if (!result.destination) return;

//     const items = Array.from(features);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setFeatures(items);

//     // Prepare new order array to send to backend
//     const updatedFeaturesOrder = items.map((item, index) => ({
//       id: item._id,
//       order: index,
//     }));

//     try {
//       // Send updated order to backend
//       await axios.post(
//         "https://privily.co/api/location/update-features-order",
//         updatedFeaturesOrder
//       );
//       console.log("Order updated successfully");
//     } catch (error) {
//       console.error("Error updating order:", error);
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
//           Features
//         </Typography>
//         <Stack direction={"row"} justifyContent={"space-between"}>
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Feature
//           </Button>
//           <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
//             <Button variant="outlined" startIcon={<GetAppIcon />}>
//               Download All
//             </Button>
//           </CSVLink>
//         </Stack>
//         <TableContainer component={Paper} sx={{ marginTop: 2 }}>
//           <DragDropContext onDragEnd={handleOnDragEnd}>
//             <Droppable droppableId="features">
//               {(provided) => (
//                 <Table {...provided.droppableProps} ref={provided.innerRef}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Id
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Full Name
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Status
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
//                         Operations
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loading
//                       ? [1, 2, 3, 4, 5].map((n) => (
//                           <TableRow key={n}>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                             <TableCell>
//                               <Skeleton />
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       : features.map((feature, index) => (
//                           <Draggable
//                             key={feature._id}
//                             draggableId={feature._id}
//                             index={index}
//                           >
//                             {(provided) => (
//                               <TableRow
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 ref={provided.innerRef}
//                               >
//                                 <TableCell>{feature._id}</TableCell>
//                                 <TableCell>{feature.name}</TableCell>
//                                 <TableCell>
//                                   <Button
//                                     variant="contained"
//                                     color={
//                                       feature.isBlocked === false
//                                         ? "success"
//                                         : "error"
//                                     }
//                                     sx={{ borderRadius: "20px" }}
//                                   >
//                                     {feature.isBlocked === false
//                                       ? "Active"
//                                       : "Inactive"}
//                                   </Button>
//                                 </TableCell>
//                                 <TableCell>
//                                   <IconButton>
//                                     <Edit />
//                                   </IconButton>
//                                   <IconButton>
//                                     {feature.isBlocked === false ? (
//                                       <Visibility />
//                                     ) : (
//                                       <VisibilityOff />
//                                     )}
//                                   </IconButton>
//                                   <IconButton>
//                                     <Delete />
//                                   </IconButton>
//                                 </TableCell>
//                               </TableRow>
//                             )}
//                           </Draggable>
//                         ))}
//                     {provided.placeholder}
//                   </TableBody>
//                 </Table>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </TableContainer>
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import GetAppIcon from "@mui/icons-material/GetApp";
import { CSVLink } from "react-csv";
import {
  fetchFeatures,
  blockFeature,
  unblockFeature,
  createFeature,
  editFeature,
  deleteFeature,
} from "../api/api.js";
import axios from "axios";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [icon, setIcon] = useState("")
  const [error, setError] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [editFeatureName, setEditFeatureName] = useState("");
  const [editicon, setediticon] = useState("")

  const loadFeatures = async () => {
    try {
      const data = await fetchFeatures();
      const sortedData = data.sort((a, b) => a.order - b.order);
      setFeatures(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching features:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(2);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        loadFeatures();
      }
    };
    effect();
  }, []);

  const handleBlockUnblockFeature = async (featureID, isBlocked) => {
    try {
      if (isBlocked) {
        await unblockFeature(featureID);
      } else {
        await blockFeature(featureID);
      }
      loadFeatures();
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} feature: `,
        error
      );
    }
  };

  const handleDeleteFeature = async (featureID) => {
    try {
      await deleteFeature(featureID);
      loadFeatures();
    } catch (error) {
      console.error("Error deleting feature: ", error);
    }
  };

  const handleEditFeature = async (event) => {
    event.preventDefault();
    try {
      await editFeature(currentFeature._id, { name: editFeatureName, icon: editicon });
      setEditModalOpen(false);
      loadFeatures();
    } catch (error) {
      console.error("Error editing feature:", error);
    }
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(features);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFeatures(items);

    const updatedFeaturesOrder = items.map((item, index) => ({
      id: item._id,
      order: index,
    }));

    try {
      await axios.post(
        "https://privily.co/api/location/update-features-order",
        updatedFeaturesOrder
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleCreateFeature = async (event) => {
    event.preventDefault();
    try {
      await createFeature({ name: newFeatureName, icon: icon, order:-1 });
      setNewFeatureName("");
      setIcon("");
      setOpen(false);
      loadFeatures();
    } catch (error) {
      console.error("Error creating feature:", error);
    }
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
  }

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
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Create Feature
        </Button>
        <CSVLink
          filename="Features.csv"
          data={features}
          headers={[
            { label: "Id", key: "_id" },
            { label: "Full Name", key: "name" },
            { label: "Status", key: "isBlocked" },
          ]}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" startIcon={<GetAppIcon />}>
            Download All
          </Button>
        </CSVLink>
      </Stack>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="features">
            {(provided) => (
              <Table {...provided.droppableProps} ref={provided.innerRef}>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? [1, 2, 3].map((n) => (
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
                    : features.map((feature, index) => (
                        <Draggable
                          key={feature._id}
                          draggableId={feature._id}
                          index={index}
                        >
                          {(provided) => (
                            <TableRow
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TableCell>{feature._id}</TableCell>
                              <TableCell>{feature.name}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color={
                                    feature.isBlocked ? "error" : "success"
                                  }
                                >
                                  {feature.isBlocked ? "Inactive" : "Active"}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={() => {
                                    setCurrentFeature(feature);
                                    setEditFeatureName(feature.name);
                                    setediticon(feature.icon);
                                    setEditModalOpen(true);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleBlockUnblockFeature(
                                      feature._id,
                                      feature.isBlocked
                                    )
                                  }
                                >
                                  {feature.isBlocked ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleDeleteFeature(feature._id)
                                  }
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleCreateFeature}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 5,
          }}
        >
          <Typography variant="h6">Create New Feature</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Feature Name"
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            margin="normal"
            required
            fullWidth
            label="icon Name"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-modal-title"
      >
        <Box
          component="form"
          onSubmit={handleEditFeature}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 5,
          }}
        >
          <Typography variant="h6">Edit Feature</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Feature Name"
            value={editFeatureName}
            onChange={(e) => setEditFeatureName(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            margin="normal"
            required
            fullWidth
            label="icon Name"
            value={editicon}
            onChange={(e) => setediticon(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Features;
