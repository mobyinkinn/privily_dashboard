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
  CircularProgress,
} from "@mui/material";
import { Add, Delete, Remove, Edit } from "@mui/icons-material";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
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
  const [verifying, setVerifying] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    city: "",
    state: "",
    country_code: "",
    zip: "",
    latitude: 15,
    longitude: 16,
  });
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
       setVerifying(true);
      let res = await verifyUser(7);
      setUserVerified(res);
       setVerifying(false);
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

  // const handleSwitchToggle = async (locationId, isBlocked) => {
  //   const url = isBlocked
  //     ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/unblock-Location/${locationId}`
  //     : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/block-Location/${locationId}`;

  //   try {
  //     await axios.put(url, null, {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo", // Replace with actual bearer token
  //       },
  //     });

  //     // Update the blocked status
  //     setBlockedStatus((prevStatus) => ({
  //       ...prevStatus,
  //       [locationId]: !isBlocked,
  //     }));

  //     // Refetch the locations to get the updated status
  //     const response = await axios.get(
  //       "https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/details"
  //     );
  //     const locationsData = response.data.data;
  //     setLocations(locationsData);
  //     const status = {};
  //     locationsData.forEach((location) => {
  //       status[location._id] = location.isBlocked;
  //     });
  //     setBlockedStatus(status);
  //   } catch (error) {
  //     console.error("Error toggling block status:", error);
  //   }
  // };

  const handleSwitchToggle = async (locationId, isUnblocked) => {
    // Renamed parameter for clarity
    const url = isUnblocked
      ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/block-Location/${locationId}` // Reverse the URLs
      : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/unblock-Location/${locationId}`;

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
        [locationId]: !isUnblocked, // Reverse logic for updating state
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

  const handleDeleteLocation = async () => {
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
      setModalMessage("Location deleted successfully");
      setModalOpen(true);
      setConfirmModalOpen(false);
      fetchLocations(); // Refresh the user data
    } catch (error) {
      console.error("Error deleting location: ", error);
    }
  };

  const handleConfirmDelete = (userId) => {
    setDeleteUserId(userId);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteLocation();
  };

  // Handle edit icon click
  const handleEditIconClick = (location) => {
    setCurrentLocation(location);
    setEditFormData({
      name: location.name,
      city: location.city,
      state: location.state,
      country_code: location.country_code,
      zip: location.zip,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setEditModalOpen(true);
  };

  // Handle input change for editing location
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle submit for editing location
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/location/edit-location/${currentLocation._id}`,
        { ...editFormData, isBlocked: currentLocation.isBlocked }, // Include isBlocked status
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      console.log("Location updated successfully:", response.data);
      setEditModalOpen(false);
      fetchLocations();
    } catch (error) {
      console.error("Error updating location:", error);
      setError("Error updating location");
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
                  <Typography variant="h6">{location.name}</Typography>

                  <Typography variant="body2" color="textSecondary">
                    {`${location.city}, ${location.state}, ${location.zip}`}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    {/* <Switch
                      checked={blockedStatus[location._id] || false}
                      onChange={() =>
                        handleSwitchToggle(
                          location._id,
                          blockedStatus[location._id]
                        )
                      }
                    /> */}
                    <Switch
                      checked={!blockedStatus[location._id]} // Default "checked" when the location is unblocked
                      onChange={() =>
                        handleSwitchToggle(
                          location._id,
                          !blockedStatus[location._id]
                        )
                      } // Reverse logic for toggling
                    />

                    <IconButton onClick={() => handleEditIconClick(location)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleConfirmDelete(location._id)}
                    >
                      <Delete />
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
                  label="Province"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="Country"
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
                Edit Location
              </Typography>
              <CloseIcon
                onClick={() => setEditModalOpen(false)}
                sx={{ cursor: "pointer" }}
              />
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
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                />
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={editFormData.city}
                  onChange={handleEditInputChange}
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
                  value={editFormData.state}
                  onChange={handleEditInputChange}
                />
                <TextField
                  margin="normal"
                  className="New"
                  required
                  fullWidth
                  label="Country Code"
                  name="country_code"
                  value={editFormData.country_code}
                  onChange={handleEditInputChange}
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
                  value={editFormData.zip}
                  onChange={handleEditInputChange}
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
              Are you sure you want to delete this location?
            </Typography>
            <Button onClick={confirmDelete} sx={{ mt: 2, mr: 2 }}>
              Yes
            </Button>
            <Button onClick={() => setConfirmModalOpen(false)} sx={{ mt: 2 }}>
              No
            </Button>
          </Box>
        </Modal>
      </Stack>
    );
  }
};

export default Location;
