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
//   Box,
//   Typography,
//   Stack,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import CloseIcon from "@mui/icons-material/Close";

// const Pods = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     state: "",
//     country_code: "",
//     zip: "",
//     latitude: 15,
//     longitude: 16,
//   });

//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/getall",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("response", podsData);
//       setPodsData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       const filteredLocations = response.data.data.filter(
//         (location) => !location.isBlocked
//       );
//       setLocations(filteredLocations);
//     } catch (error) {
//       console.error("Error fetching locations: ", error);
//     }
//   };

//   const handleOpen = () => {
//     fetchLocations();
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = {
//       ...formData,
//       location: selectedLocation,
//     };
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/create-pods",
//         payload,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Pod created successfully: ", response.data);
//       handleClose();
//     } catch (error) {
//       console.error("Error creating pod: ", error);
//       setError("Error creating pod");
//     }
//   };

//   useEffect(() => {
//     fetchPodsData();
//   }, []);

//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Pods
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
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Pods
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
//               <TableCell>Image</TableCell>
//               <TableCell>Pod Id</TableCell>
//               <TableCell>title</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Ratings</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod.id}>
//                 <TableCell>
//                   {pod.images.map((pod) => (
//                     <img
//                       src={pod.url}
//                       alt=""
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   ))}
//                 </TableCell>

//                 <TableCell>{pod._id}</TableCell>
//                 <TableCell>{pod.title}</TableCell>
//                 <TableCell>
//                   {`${pod.location.city}, ${pod.location.state}`}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={pod.isAvailable === true ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.isAvailable === true ? "active" : "Inactive"}
//                   </Button>
//                 </TableCell>
//                 <TableCell></TableCell>
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
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "40%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 5,
//             p: 4,
//           }}
//         >
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Typography variant="h6" component="h2">
//               Create New pod
//             </Typography>
//             <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
//           </Stack>
//           <Stack alignItems={"center"}>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 className="New"
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="Country Code"
//                 name="country_code"
//                 value={formData.country_code}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="ZIP"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <Select
//                 fullWidth
//                 value={selectedLocation}
//                 onChange={handleLocationChange}
//                 displayEmpty
//                 renderValue={(selected) => {
//                   if (!selected) {
//                     return <em>Select Location</em>;
//                   }
//                   const location = locations.find(
//                     (location) => location._id === selected
//                   );
//                   return `${location.name}, ${location.city}, ${location.state}, ${location.zip}`;
//                 }}
//               >
//                 <MenuItem disabled value="">
//                   <em>Select Location</em>
//                 </MenuItem>
//                 {locations.map((location) => (
//                   <MenuItem key={location._id} value={location._id}>
//                     {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Stack>
//           </Stack>
//           {error && <Typography color="error">{error}</Typography>}
//           <Box
//             sx={{ mt: 2 }}
//             display={"flex"}
//             width={"100%"}
//             justifyContent={"center"}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 width: "50%",
//                 backgroundColor: "#ED3327",
//                 "&:hover": { bgcolor: "#ED3327" },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Pods;

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
//   Box,
//   Typography,
//   Stack,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import CloseIcon from "@mui/icons-material/Close";

// const Pods = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedFeatures, setSelectedFeatures] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     state: "",
//     country_code: "",
//     zip: "",
//     latitude: 15,
//     longitude: 16,
//   });

//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/getall",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setPodsData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       const filteredLocations = response.data.data.filter(
//         (location) => !location.isBlocked
//       );
//       setLocations(filteredLocations);
//     } catch (error) {
//       console.error("Error fetching locations: ", error);
//     }
//   };

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
//     } catch (error) {
//       console.error("Error fetching features: ", error);
//     }
//   };

//   const handleOpen = () => {
//     fetchLocations();
//     fetchFeatures();
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setError("");
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleFeatureChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = {
//       ...formData,
//       location: selectedLocation,
//       features: selectedFeatures,
//     };
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/create-pods",
//         payload,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Pod created successfully: ", response.data);
//       handleClose();
//       fetchPodsData();
//     } catch (error) {
//       console.error("Error creating pod: ", error);
//       setError("Error creating pod");
//     }
//   };

//   useEffect(() => {
//     fetchPodsData();
//   }, []);

//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Pods
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
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Pods
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
//               <TableCell>Image</TableCell>
//               <TableCell>Pod Id</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Ratings</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod.id}>
//                 <TableCell>
//                   {pod.images.map((image) => (
//                     <img
//                       src={image.url}
//                       alt=""
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   ))}
//                 </TableCell>
//                 <TableCell>{pod._id}</TableCell>
//                 <TableCell>{pod.title}</TableCell>
//                 <TableCell>
//                   {`${pod.location.city}, ${pod.location.state}`}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={pod.isAvailable ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.isAvailable ? "Active" : "Inactive"}
//                   </Button>
//                 </TableCell>
//                 <TableCell></TableCell>
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
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "40%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 5,
//             p: 4,
//           }}
//         >
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Typography variant="h6" component="h2">
//               Create New Pod
//             </Typography>
//             <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
//           </Stack>
//           <Stack alignItems={"center"}>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 className="New"
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="State"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="Country Code"
//                 name="country_code"
//                 value={formData.country_code}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <TextField
//                 margin="normal"
//                 className="New"
//                 required
//                 fullWidth
//                 label="ZIP"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={handleInputChange}
//               />
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <Select
//                 fullWidth
//                 value={selectedLocation}
//                 onChange={handleLocationChange}
//                 displayEmpty
//                 renderValue={(selected) => {
//                   if (!selected) {
//                     return <em>Select Location</em>;
//                   }
//                   const location = locations.find(
//                     (location) => location._id === selected
//                   );
//                   return `${location.name}, ${location.city}, ${location.state}, ${location.zip}`;
//                 }}
//               >
//                 <MenuItem disabled value="">
//                   <em>Select Location</em>
//                 </MenuItem>
//                 {locations.map((location) => (
//                   <MenuItem key={location._id} value={location._id}>
//                     {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Stack>
//             <Stack direction={"row"} gap={2}>
//               <Select
//                 multiple
//                 fullWidth
//                 value={selectedFeatures}
//                 onChange={handleFeatureChange}
//                 renderValue={(selected) =>
//                   selected
//                     .map(
//                       (id) =>
//                         features.find((feature) => feature._id === id)?.name
//                     )
//                     .join(", ")
//                 }
//               >
//                 {features.map((feature) => (
//                   <MenuItem key={feature._id} value={feature._id}>
//                     <Checkbox
//                       checked={selectedFeatures.indexOf(feature._id) > -1}
//                     />
//                     <ListItemText primary={feature.name} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Stack>
//           </Stack>
//           {error && <Typography color="error">{error}</Typography>}
//           <Box
//             sx={{ mt: 2 }}
//             display={"flex"}
//             width={"100%"}
//             justifyContent={"center"}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 width: "50%",
//                 backgroundColor: "#ED3327",
//                 "&:hover": { bgcolor: "#ED3327" },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Pods;

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
//   Box,
//   Typography,
//   Stack,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Stepper,
//   Step,
//   StepLabel,
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const Pods = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [activeStep, setActiveStep] = useState(0);

//   const [formData, setFormData] = useState({
//     deviceId: "1",
//     productId: "prod00qd",
//     title: "",
//     description: "",
//     location: "",
//     category: "6651c4c9d8213019596f5766",
//     timeSlot: "9am-5pm",
//     isAvailable: true,
//     features: [],
//     images: [],
//     tags: "Cape Town, Meeting Room",
//     ratings: [],
//     ratingCount: 0,
//     totalRating: "0",
//     booking_requirements: "",
//     availability: "",
//     cancellation_policy: "",
//   });

//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/getall",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setPodsData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       const filteredLocations = response.data.data.filter(
//         (location) => !location.isBlocked
//       );
//       setLocations(filteredLocations);
//     } catch (error) {
//       console.error("Error fetching locations: ", error);
//     }
//   };

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
//     } catch (error) {
//       console.error("Error fetching features: ", error);
//     }
//   };

//   const handleOpen = () => {
//     fetchLocations();
//     fetchFeatures();
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setError("");
//     setActiveStep(0);
//     setFormData({
//       deviceId: "1",
//       productId: "prod00qd",
//       title: "",
//       description: "",
//       location: "",
//       category: "6651c4c9d8213019596f5766",
//       timeSlot: "9am-5pm",
//       isAvailable: true,
//       features: [],
//       images: [],
//       tags: "Cape Town, Meeting Room",
//       ratings: [],
//       ratingCount: 0,
//       totalRating: "0",
//       booking_requirements: "",
//       availability: "",
//       cancellation_policy: "",
//     });
//     setSelectedFeatures([]);
//     setSelectedLocation("");
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleFeatureChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const payload = {
//       ...formData,
//       location: selectedLocation,
//       features: selectedFeatures,
//     };
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/create-pods",
//         payload,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Pod created successfully: ", response.data);
//       handleClose();
//       fetchPodsData();
//     } catch (error) {
//       console.error("Error creating pod: ", error);
//       setError("Error creating pod");
//     }
//   };

//   useEffect(() => {
//     fetchPodsData();
//   }, []);

//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Pods
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
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Pods
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
//               <TableCell>Image</TableCell>
//               <TableCell>Pod Id</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Ratings</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod.id}>
//                 <TableCell>
//                   {pod.images.map((image) => (
//                     <img
//                       src={image.url}
//                       alt=""
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   ))}
//                 </TableCell>
//                 <TableCell>{pod._id}</TableCell>
//                 <TableCell>{pod.title}</TableCell>
//                 <TableCell>
//                   {`${pod.location.city}, ${pod.location.state}`}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={pod.isAvailable ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.isAvailable ? "Active" : "Inactive"}
//                   </Button>
//                 </TableCell>
//                 <TableCell></TableCell>
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
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "40%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 5,
//             p: 4,
//           }}
//         >
//           <Stepper activeStep={activeStep} alternativeLabel>
//             <Step key="Step 1">
//               <StepLabel>Step 1</StepLabel>
//             </Step>
//             <Step key="Step 2">
//               <StepLabel>Step 2</StepLabel>
//             </Step>
//           </Stepper>
//           {activeStep === 0 ? (
//             <>
//               <Stack alignItems={"center"}>
//                 <Stack direction={"row"} gap={2}>
//                   <TextField
//                     className="New"
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                   />
//                   <TextField
//                     margin="normal"
//                     className="New"
//                     required
//                     fullWidth
//                     label="Description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
//                 </Stack>
//                 <Stack direction={"row"} gap={2}>
//                   <Select
//                     fullWidth
//                     value={selectedLocation}
//                     onChange={handleLocationChange}
//                     displayEmpty
//                     renderValue={(selected) => {
//                       if (!selected) {
//                         return <em>Select Location</em>;
//                       }
//                       const location = locations.find(
//                         (location) => location._id === selected
//                       );
//                       return `${location.name}, ${location.city}, ${location.state}, ${location.zip}`;
//                     }}
//                   >
//                     <MenuItem disabled value="">
//                       <em>Select Location</em>
//                     </MenuItem>
//                     {locations.map((location) => (
//                       <MenuItem key={location._id} value={location._id}>
//                         {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Stack>
//                 <Stack direction={"row"} gap={2}>
//                   <Select
//                     multiple
//                     fullWidth
//                     value={selectedFeatures}
//                     onChange={handleFeatureChange}
//                     renderValue={(selected) =>
//                       selected
//                         .map(
//                           (id) =>
//                             features.find((feature) => feature._id === id)?.name
//                         )
//                         .join(", ")
//                     }
//                   >
//                     {features.map((feature) => (
//                       <MenuItem key={feature._id} value={feature._id}>
//                         <Checkbox
//                           checked={selectedFeatures.indexOf(feature._id) > -1}
//                         />
//                         <ListItemText primary={feature.name} />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Stack>
//               </Stack>
//               <Box
//                 sx={{ mt: 2 }}
//                 display={"flex"}
//                 width={"100%"}
//                 justifyContent={"space-between"}
//               >
//                 <Button
//                   disabled
//                   onClick={handleBack}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleNext}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Stack alignItems={"center"}>
//                 <Stack direction={"row"} gap={2}>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Booking Requirements"
//                     name="booking_requirements"
//                     value={formData.booking_requirements}
//                     onChange={handleInputChange}
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Availability"
//                     name="availability"
//                     value={formData.availability}
//                     onChange={handleInputChange}
//                   />
//                 </Stack>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label="Cancellation Policy"
//                   name="cancellation_policy"
//                   value={formData.cancellation_policy}
//                   onChange={handleInputChange}
//                 />
//               </Stack>
//               <Box
//                 sx={{ mt: 2 }}
//                 display={"flex"}
//                 width={"100%"}
//                 justifyContent={"space-between"}
//               >
//                 <Button
//                   onClick={handleBack}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Pods;

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
//   Box,
//   Typography,
//   Stack,
//   Modal,
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Stepper,
//   Step,
//   StepLabel,
// } from "@mui/material";
// import { Visibility, Download, Delete } from "@mui/icons-material";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// const Pods = () => {
//   const [podsData, setPodsData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const [activeStep, setActiveStep] = useState(0);
//   const [images, setImages] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);

//   const [formData, setFormData] = useState({
//     deviceId: "1",
//     productId: "prod00qd",
//     title: "",
//     description: "",
//     location: "",
//     category: "6651c4c9d8213019596f5766",
//     timeSlot: "9am-5pm",
//     isAvailable: true,
//     features: [],
//     images: [],
//     tags: "Cape Town, Meeting Room",
//     ratings: [],
//     ratingCount: 0,
//     totalRating: "0",
//     booking_requirements: "",
//     availability: "",
//     cancellation_policy: "",
//   });

//   const fetchPodsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/getall",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setPodsData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       const filteredLocations = response.data.data.filter(
//         (location) => !location.isBlocked
//       );
//       setLocations(filteredLocations);
//     } catch (error) {
//       console.error("Error fetching locations: ", error);
//     }
//   };

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
//     } catch (error) {
//       console.error("Error fetching features: ", error);
//     }
//   };

//   const handleOpen = () => {
//     fetchLocations();
//     fetchFeatures();
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setError("");
//     setActiveStep(0);
//     setFormData({
//       deviceId: "1",
//       productId: "prod00qd",
//       title: "",
//       description: "",
//       location: "",
//       category: "6651c4c9d8213019596f5766",
//       timeSlot: "9am-5pm",
//       isAvailable: true,
//       features: [],
//       images: [],
//       tags: "Cape Town, Meeting Room",
//       ratings: [],
//       ratingCount: 0,
//       totalRating: "0",
//       booking_requirements: "",
//       availability: "",
//       cancellation_policy: "",
//     });
//     setSelectedFeatures([]);
//     setSelectedLocation("");
//     setImages([]);
//     setImageUrls([]);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleFeatureChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleImageChange = (event) => {
//     setImages(event.target.files);
//   };

//   const handleImageUpload = async () => {
//     const uploadedUrls = [];
//     for (const image of images) {
//       const formData = new FormData();
//       formData.append("images", image);
//       try {
//         const response = await axios.post(
//           "https://hammerhead-app-lqsdj.ondigitalocean.app/api/upload",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//             },
//           }
//         );
//         uploadedUrls.push(response.data.files[0].url);
//       } catch (error) {
//         console.error("Error uploading image: ", error);
//       }
//     }
//     setImageUrls(uploadedUrls);
//     return uploadedUrls;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const uploadedUrls = await handleImageUpload();
//     const payload = {
//       ...formData,
//       location: selectedLocation,
//       features: selectedFeatures,
//       images: uploadedUrls.map((url) => ({ public_id: "image", url })),
//     };
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/create-pods",
//         payload,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       console.log("Pod created successfully: ", response.data);
//       handleClose();
//       fetchPodsData();
//     } catch (error) {
//       console.error("Error creating pod: ", error);
//       setError("Error creating pod");
//     }
//   };

//   useEffect(() => {
//     fetchPodsData();
//   }, []);

//   return (
//     <Box sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Pods
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
//           <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Create Pods
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
//               <TableCell>Image</TableCell>
//               <TableCell>Pod Id</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Opeartions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {podsData.map((pod) => (
//               <TableRow key={pod.id}>
//                 <TableCell>
//                   {pod.images && pod.images.length > 0 && (
//                     <img
//                       key={pod.images[0]._id}
//                       src={`https://hammerhead-app-lqsdj.ondigitalocean.app${pod.images[0].url}`}
//                       alt=""
//                       style={{ width: "50px", height: "50px" }}
//                     />
//                   )}
//                 </TableCell>
//                 <TableCell>{pod._id}</TableCell>
//                 <TableCell>{pod.title}</TableCell>
//                 <TableCell>
//                   {`${pod.location.city}, ${pod.location.state}`}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color={pod.isAvailable ? "success" : "error"}
//                     sx={{ borderRadius: "20px" }}
//                   >
//                     {pod.isAvailable ? "Active" : "Inactive"}
//                   </Button>
//                 </TableCell>
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
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "40%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             borderRadius: 5,
//             p: 4,
//           }}
//         >
//           <Stepper activeStep={activeStep} alternativeLabel>
//             <Step key="Step 1">
//               <StepLabel>Step 1</StepLabel>
//             </Step>
//             <Step key="Step 2">
//               <StepLabel>Step 2</StepLabel>
//             </Step>
//           </Stepper>
//           {activeStep === 0 ? (
//             <>
//               <Stack alignItems={"center"}>
//                 <Stack direction={"row"} gap={2}>
//                   <TextField
//                     className="New"
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                   />
//                   <TextField
//                     margin="normal"
//                     className="New"
//                     required
//                     fullWidth
//                     label="Description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                   />
//                 </Stack>
//                 <Stack direction={"row"} gap={2}>
//                   <Select
//                     fullWidth
//                     value={selectedLocation}
//                     onChange={handleLocationChange}
//                     displayEmpty
//                     renderValue={(selected) => {
//                       if (!selected) {
//                         return <em>Select Location</em>;
//                       }
//                       const location = locations.find(
//                         (location) => location._id === selected
//                       );
//                       return `${location.name}, ${location.city}, ${location.state}, ${location.zip}`;
//                     }}
//                   >
//                     <MenuItem disabled value="">
//                       <em>Select Location</em>;
//                     </MenuItem>
//                     {locations.map((location) => (
//                       <MenuItem key={location._id} value={location._id}>
//                         {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Stack>
//                 <Stack direction={"row"} gap={2}>
//                   <Select
//                     multiple
//                     fullWidth
//                     value={selectedFeatures}
//                     onChange={handleFeatureChange}
//                     renderValue={(selected) =>
//                       selected
//                         .map(
//                           (id) =>
//                             features.find((feature) => feature._id === id)?.name
//                         )
//                         .join(", ")
//                     }
//                   >
//                     {features.map((feature) => (
//                       <MenuItem key={feature._id} value={feature._id}>
//                         <Checkbox
//                           checked={selectedFeatures.indexOf(feature._id) > -1}
//                         />
//                         <ListItemText primary={feature.name} />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Stack>
//                 <Stack direction={"row"} gap={2}>
//                   <input type="file" multiple onChange={handleImageChange} />
//                 </Stack>
//               </Stack>
//               <Box
//                 sx={{ mt: 2 }}
//                 display={"flex"}
//                 width={"100%"}
//                 justifyContent={"space-between"}
//               >
//                 <Button
//                   disabled
//                   onClick={handleBack}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleNext}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Stack alignItems={"center"}>
//                 <Stack direction={"row"} gap={2}>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Booking Requirements"
//                     name="booking_requirements"
//                     value={formData.booking_requirements}
//                     onChange={handleInputChange}
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Availability"
//                     name="availability"
//                     value={formData.availability}
//                     onChange={handleInputChange}
//                   />
//                 </Stack>
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label="Cancellation Policy"
//                   name="cancellation_policy"
//                   value={formData.cancellation_policy}
//                   onChange={handleInputChange}
//                 />
//               </Stack>
//               <Box
//                 sx={{ mt: 2 }}
//                 display={"flex"}
//                 width={"100%"}
//                 justifyContent={"space-between"}
//               >
//                 <Button
//                   onClick={handleBack}
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{
//                     width: "20%",
//                     backgroundColor: "#ED3327",
//                     "&:hover": { bgcolor: "#ED3327" },
//                   }}
//                 >
//                   Submit
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Pods;

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
  Box,
  Typography,
  Stack,
  Modal,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, Download, Delete } from "@mui/icons-material";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const Pods = () => {
  const [podsData, setPodsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [userVerified, setUserVerified] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const [formData, setFormData] = useState({
    UserId: "",
    deviceId: "",
    productId: "prod00qd",
    title: "",
    description: "",
    location: "",
    category: "6651c4c9d8213019596f5766",
    timeSlot: "9am-5pm",
    isAvailable: true,
    features: [],
    images: [],
    tags: "Cape Town, Meeting Room",
    ratings: [],
    ratingCount: 0,
    totalRating: "0",
    booking_requirements: "",
    availability: "",
    cancellation_policy: "",
  });

  const fetchPodsData = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/getall",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setPodsData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      const filteredLocations = response.data.data.filter(
        (location) => !location.isBlocked
      );
      setLocations(filteredLocations);
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };

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
      setFeatures(response.data.data);
    } catch (error) {
      console.error("Error fetching features: ", error);
    }
  };

  const handleOpen = () => {
    fetchLocations();
    fetchFeatures();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setFormData({
      UserId: "",
      deviceId: "1",
      productId: "prod00qd",
      title: "",
      description: "",
      location: "",
      category: "6651c4c9d8213019596f5766",
      timeSlot: "9am-5pm",
      isAvailable: true,
      features: [],
      images: [],
      tags: "Cape Town, Meeting Room",
      ratings: [],
      ratingCount: 0,
      totalRating: "0",
      booking_requirements: "",
      availability: "",
      cancellation_policy: "",
    });
    setSelectedFeatures([]);
    setSelectedLocation("");
    setImages([]);
    setImageUrls([]);
  };
  const { verifyUser } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleFeatureChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFeatures(typeof value === "string" ? value.split(",") : value);
  };

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleImageUpload = async () => {
    const uploadedUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("images", image);
      try {
        const response = await axios.post(
          "https://hammerhead-app-lqsdj.ondigitalocean.app/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
            },
          }
        );
        uploadedUrls.push(response.data.files[0].url);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
    setImageUrls(uploadedUrls);
    return uploadedUrls;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uploadedUrls = await handleImageUpload();
    const payload = {
      ...formData,
      location: selectedLocation,
      features: selectedFeatures,
      images: uploadedUrls.map((url) => ({ public_id: "image", url })),
    };
    try {
      const response = await axios.post(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product/create-pods",
        payload,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      if (response.status === 200) {
        setAlertOpen(true);
      }
      handleClose();
      fetchPodsData();
    } catch (error) {
      console.error("Error creating pod: ", error);
      setError("Error creating pod");
    }
  };
  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(3);
      setUserVerified(res);
      if (res) {
        fetchPodsData();
      }
    };
    effect();
  }, []);

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
          Pods
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
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Create Pods
            </Button>
          </Stack>
          <Button variant="outlined" startIcon={<GetAppIcon />}>
            All Downloads
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Pod Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Opeartions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {podsData.map((pod) => (
                <TableRow key={pod.id}>
                  <TableCell>
                    {pod.images && pod.images.length > 0 && (
                      <img
                        key={pod.images[0]._id}
                        src={`https://hammerhead-app-lqsdj.ondigitalocean.app${pod.images[0].url}`}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{pod._id}</TableCell>
                  <TableCell>{pod.title}</TableCell>
                  <TableCell>
                    {`${pod.location.city}, ${pod.location.state}`}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={pod.isAvailable ? "success" : "error"}
                      sx={{ borderRadius: "20px" }}
                    >
                      {pod.isAvailable ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Visibility />
                    </IconButton>
                    <IconButton>
                      <Download />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleClose}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}
          >
            <Stack p={"0 16px 16px 16px"}>
              <Typography
                fontWeight={"bold"}
                fontSize={"30px"}
                textAlign={"center"}
              >
                Create Pod
              </Typography>
              {/* <CloseIcon onClick={handleClose} /> */}
              {/* <Button
              onClick={handleClose}
              sx={{
                width: "20%",
                backgroundColor: "#ED3327",
                "&:hover": { bgcolor: "#ED3327" },
              }}
            >
              Cancel
            </Button> */}
            </Stack>
            <Stack spacing={2}>
              <Stack direction={"row"} gap={2}>
                <TextField
                  margin="normal"
                  required
                  style={{ width: "50%" }}
                  label="User Id"
                  name="UserId"
                  value={formData.UserId}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  style={{ width: "50%" }}
                  label="Device ID"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleInputChange}
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Stack direction={"row"} gap={2}>
                <Select
                  style={{ width: "50%" }}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Select Location</em>;
                    }
                    const location = locations.find(
                      (location) => location._id === selected
                    );
                    return `${location.name}, ${location.city}, ${location.state}, ${location.zip}`;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select Location</em>
                  </MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location._id}>
                      {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  multiple
                  style={{ width: "50%" }}
                  value={selectedFeatures}
                  onChange={handleFeatureChange}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select Features</em>;
                    }
                    return selected
                      .map(
                        (id) =>
                          features.find((feature) => feature._id === id)?.name
                      )
                      .join(", ");
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Select Features</em>
                  </MenuItem>
                  {features.map((feature) => (
                    <MenuItem key={feature._id} value={feature._id}>
                      <Checkbox
                        checked={selectedFeatures.indexOf(feature._id) > -1}
                      />
                      <ListItemText primary={feature.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <input type="file" multiple onChange={handleImageChange} />
              <Stack direction={"row"} gap={2}>
                <TextField
                  margin="normal"
                  required
                  style={{ width: "50%" }}
                  label="Booking Requirements"
                  name="booking_requirements"
                  value={formData.booking_requirements}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  style={{ width: "50%" }}
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                />
              </Stack>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Cancellation Policy"
                name="cancellation_policy"
                value={formData.cancellation_policy}
                onChange={handleInputChange}
              />
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
                    width: "20%",
                    backgroundColor: "#ED3327",
                    "&:hover": { bgcolor: "#ED3327" },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </Box>
        </Modal>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
        >
          <Alert onClose={() => setAlertOpen(false)} severity="success">
            Pod created successfully!
          </Alert>
        </Snackbar>
      </Box>
    );
  }
};

export default Pods;
