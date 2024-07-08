// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
//   Pagination,
//   Modal,
//   TextField,
//   Switch,
//   Stack,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";
// import WifiIcon from "@mui/icons-material/Wifi";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import KeyIcon from "@mui/icons-material/VpnKey";
// import CloseIcon from "@mui/icons-material/Close";
// import "./all.css"; // Adjust the path as needed

// const Location = () => {
//   const [locations, setLocations] = useState([]);
//   const [page, setPage] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [blockedStatus, setBlockedStatus] = useState({});
//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     state: "",
//     country_code: "",
//     zip: "",
//     latitude: 15,
//     longitude: 16,
//   });
//   const [error, setError] = useState("");
//   const itemsPerPage = 6; // Number of items per page

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get(
//           "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details"
//         );
//          const locationsData = response.data.data;
//          setLocations(locationsData);
//         const status = {};
//         locationsData.forEach((location) => {
//           status[location._id] = location.isBlocked;
//         });
//         setBlockedStatus(status);
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/create",
//         formData
//       );
//       setLocations([...locations, response.data]);
//       handleClose();
//       setFormData({
//         name: "",
//         city: "",
//         state: "",
//         country_code: "",
//         zip: "",
//         latitude: 15,
//         longitude: 16,
//       });
//     } catch (error) {
//       setError("Error creating location. Please check the form and try again.");
//       console.error("Error creating location:", error);
//     }
//   };

//   const displayedLocations = locations.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <Stack sx={{ padding: "43px 5px" }}>
//       <Typography
//         variant="h5"
//         fontWeight={"bold"}
//         sx={{ marginBottom: 2, color: "#ED3327" }}
//       >
//         Location
//       </Typography>
//       <Stack justifyContent={"space-between"} direction={"row"} marginBlock={2}>
//         <Button variant="outlined">All Locations</Button>
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
//             onClick={handleOpen}
//           >
//             Add Location
//           </Button>
//           <Button variant="outlined"> Remove location</Button>
//         </Stack>
//       </Stack>
//       <Grid container spacing={3} pt={2}>
//         {displayedLocations.map((location) => (
//           <Grid item xs={12} sm={6} md={4} key={location._id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image="https://via.placeholder.com/150" // Replace with actual image URL if available
//                 alt={location.name}
//               />
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography variant="h6">{location.name}</Typography>
//                   <Switch checked={blockedStatus[location._id] || false} />
//                 </Box>
//                 <Typography variant="body2" color="textSecondary">
//                   {`${location.city}, ${location.state}, ${location.zip}`}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-around",
//                     marginTop: 2,
//                   }}
//                 >
//                   <IconButton>
//                     <AccessibilityIcon />
//                   </IconButton>
//                   <IconButton>
//                     <WifiIcon />
//                   </IconButton>
//                   <IconButton>
//                     <AcUnitIcon />
//                   </IconButton>
//                   <IconButton>
//                     <KeyIcon />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//         <Pagination
//           count={Math.ceil(locations.length / itemsPerPage)}
//           page={page}
//           onChange={handlePageChange}
//           variant="outlined"
//           shape="rounded"
//         />
//       </Box>
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
//               Add New Location
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
//     </Stack>
//   );
// };

// export default Location;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Grid,
  Pagination,
  Modal,
  TextField,
  Switch,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import WifiIcon from "@mui/icons-material/Wifi";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyIcon from "@mui/icons-material/VpnKey";
import CloseIcon from "@mui/icons-material/Close";
import "./all.css"; // Adjust the path as needed
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [blockedStatus, setBlockedStatus] = useState({});
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    country_code: "",
    zip: "",
    latitude: 15,
    longitude: 16,
  });
  const [error, setError] = useState("");
  const itemsPerPage = 6; // Number of items per page

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details"
      );
      const locationsData = response.data.data;
      setLocations(locationsData);
      const status = {};
      locationsData.forEach((location) => {
        status[location._id] = location.isBlocked;
      });
      setBlockedStatus(status);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(7);
      setUserVerified(res);
      if (res) {
        fetchLocations();
      }
    };
    effect();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/create",
        formData
      );
      setLocations([...locations, response.data]);
      handleClose();
      setFormData({
        name: "",
        city: "",
        state: "",
        country_code: "",
        zip: "",
        latitude: 15,
        longitude: 16,
      });
    } catch (error) {
      setError("Error creating location. Please check the form and try again.");
      console.error("Error creating location:", error);
    }
  };

  const handleSwitchToggle = async (locationId, isBlocked) => {
    const url = isBlocked
      ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/unblock-Location/${locationId}`
      : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/block-Location/${locationId}`;

    try {
      await axios.put(url, null, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo", // Replace with actual bearer token
        },
      });

      // Update the blocked status
      setBlockedStatus((prevStatus) => ({
        ...prevStatus,
        [locationId]: !isBlocked,
      }));

      // Refetch the locations to get the updated status
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details"
      );
      const locationsData = response.data.data;
      setLocations(locationsData);
      const status = {};
      locationsData.forEach((location) => {
        status[location._id] = location.isBlocked;
      });
      setBlockedStatus(status);
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const displayedLocations = locations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (!userVerified) {
    return <NoAccess />;
  } else {
    return (
      <Stack sx={{ padding: "43px 5px" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "#ED3327" }}
        >
          Location
        </Typography>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          marginBlock={2}
        >
          <Button variant="outlined">All Locations</Button>
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
              onClick={handleOpen}
            >
              Add Location
            </Button>
            <Button variant="outlined"> Remove location</Button>
          </Stack>
        </Stack>
        <Grid container spacing={3} pt={2}>
          {displayedLocations.map((location) => (
            <Grid item xs={12} sm={6} md={4} key={location._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150" // Replace with actual image URL if available
                  alt={location.name}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">{location.name}</Typography>
                    <Switch
                      checked={blockedStatus[location._id] || false}
                      onChange={() =>
                        handleSwitchToggle(
                          location._id,
                          blockedStatus[location._id]
                        )
                      }
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {`${location.city}, ${location.state}, ${location.zip}`}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: 2,
                    }}
                  >
                    <IconButton>
                      <AccessibilityIcon />
                    </IconButton>
                    <IconButton>
                      <WifiIcon />
                    </IconButton>
                    <IconButton>
                      <AcUnitIcon />
                    </IconButton>
                    <IconButton>
                      <KeyIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(locations.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
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
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h6" component="h2">
                Add New Location
              </Typography>
              <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
            </Stack>
            <Stack alignItems={"center"}>
              <Stack direction={"row"} gap={2}>
                <TextField
                  className="New"
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="Country Code"
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="ZIP"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </Stack>
            </Stack>
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
      </Stack>
    );
  }
};

export default Location;
