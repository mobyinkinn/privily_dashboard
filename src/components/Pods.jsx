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
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Visibility, Delete, VisibilityOff, Edit } from "@mui/icons-material";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { CSVLink } from "react-csv";
import {
  fetchPodsData,
  fetchLocations,
  fetchFeatures,
  uploadImages,
  createPod,
  editPod,
  blockPod,
  unblockPod,
  deletePod,
} from "../api/api.js";
const Pods = () => {
  const [podsData, setPodsData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deletePodId, setDeletePodId] = useState(null);
  const [currentPod, setCurrentPod] = useState(null);
  const [verifying, setVerifying] = useState(true);
  const [errors, setErrors] = useState({
    location: false,
    features: false,
    images: false,
  });
  const [formData, setFormData] = useState({
    UserId: "",
    deviceId: "",
    password:"",
    serial:"",
    productId: "prod00qd",
    title: "",
    description: "",
    direction: "",
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
    safety_and_property: "",
  });
  const [editFormData, setEditFormData] = useState({
    UserId: "",
    deviceId: "",
    password: "",
    serial: "",
    title: "",
    slug: "",
    description: "",
    direction: "",
    booking_requirements: "",
    cancellation_policy: "",
    safety_and_property: "",
    availability: "",
    isBlocked: false,
    location: "",
    features: [],
    category: "",
    timeSlot: "",
    isAvailable: true,
    images: [],
    tags: "",
  });
  const { verifyUser } = useAuth();

  // Fetch pods data using API function
  const loadPodsData = async () => {
    try {
      const data = await fetchPodsData();
      setPodsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  // Fetch locations
  const loadLocations = async () => {
    try {
      const response = await fetchLocations();
      const filteredLocations = response.data.filter(
        (location) => !location.isBlocked
      );
      setLocations(filteredLocations);
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };

  // Fetch features
  const loadFeatures = async () => {
    try {
      const data = await fetchFeatures();
      const filteredFeatures = data.filter((feature) => !feature.isBlocked);
      setFeatures(filteredFeatures);
    } catch (error) {
      console.error("Error fetching features: ", error);
    }
  };

  const handleOpen = () => {
    loadLocations();
    loadFeatures();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setFormData({
      UserId: "",
      password: "",
      serial: "",
      deviceId: "",
      productId: "prod00qd",
      title: "",
      description: "",
      location: "",
      direction: "",
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
      safety_and_property: "",
    });
    setSelectedFeatures([]);
    setSelectedLocation("");
    setImages([]);
    setImageUrls([]);
  };


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
    try {
      const files = Array.from(images);
      const response = await uploadImages(files);
      const uploadedUrls = response.files.map((file) => file.url);
      setImageUrls(uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  };

  const handleEditIconClick = (product) => {
    setCurrentPod(product);
    loadLocations();
    loadFeatures();
    setEditFormData({
      UserId: product.UserId || "",
      deviceId: product.deviceId,
      password: product.password,
      serial: product.serial,
      title: product.title,
      slug: product.slug,
      description: product.description,
      direction: product.direction,
      booking_requirements: product.booking_requirements,
      cancellation_policy: product.cancellation_policy,
      safety_and_property: product.safety_and_property,
      availability: product.availability,
      isBlocked: product.isBlocked,
      location: product.location._id,
      features: product.features.map((feature) => feature._id),
      category: product.category,
      timeSlot: product.timeSlot,
      isAvailable: product.isAvailable,
      images: product.images.map((image) => image.url),
      tags: product.tags,
    });
    setEditModalOpen(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditImageChange = (event) => {
    const files = event.target.files;
    setEditFormData({
      ...editFormData,
      images: files,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    let uploadedUrls = editFormData.images;

    if (
      editFormData.images.length > 0 &&
      editFormData.images[0] instanceof File
    ) {
      // If new images are uploaded, handle their upload
      try {
        const files = Array.from(editFormData.images);
        const uploadResponse = await uploadImages(files);
        uploadedUrls = uploadResponse.files.map((file) => ({
          public_id: "image",
          url: file.url,
        }));
      } catch (error) {
        console.error("Error uploading images:", error);
        return;
      }
    } else {
      // If images are URLs, format them appropriately
      uploadedUrls = uploadedUrls.map((url) => ({
        public_id: "image",
        url,
      }));
    }

    try {
      const response = await editPod(currentPod._id, {
        ...editFormData,
        images: uploadedUrls,
      });
      console.log("Pod updated successfully:", response);
      setEditModalOpen(false);
      loadPodsData();
    } catch (error) {
      console.error("Error updating pod:", error);
      setError("Error updating pod");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasError = {
      location: !selectedLocation,
      features: selectedFeatures.length === 0,
      images: images.length === 0,
    };

    setErrors(hasError);

    if (Object.values(hasError).some((error) => error)) {
      return;
    }

    const uploadedUrls = await handleImageUpload();
    const payload = {
      ...formData,
      location: selectedLocation,
      features: selectedFeatures,
      images: uploadedUrls.map((url) => ({ public_id: "image", url })),
    };

    try {
      const response = await createPod(payload);
      if (response) {
        setAlertOpen(true);
      }
      handleClose();
      loadPodsData();
    } catch (error) {
      console.error("Error creating pod: ", error);
      setError("Error creating pod");
    }
  };

  const handleBlockUnblockPod = async (podId, isBlocked) => {
    try {
      let response;
      if (isBlocked) {
        response = await unblockPod(podId);
      } else {
        response = await blockPod(podId);
      }
      setModalMessage(response.message || "Operation successful");
      setModalOpen(true);
      loadPodsData();
    } catch (error) {
      console.error(
        `Error ${isBlocked ? "unblocking" : "blocking"} pod: `,
        error
      );
    }
  };

  const handleDeletePod = async () => {
    try {
      const response = await deletePod(deletePodId);
      setModalMessage("Pod deleted successfully");
      setModalOpen(true);
      setConfirmModalOpen(false);
      loadPodsData();
    } catch (error) {
      console.error("Error deleting pod: ", error);
    }
  };

  const handleConfirmDelete = (podId) => {
    setDeletePodId(podId);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeletePod();
  };

  useEffect(() => {
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(3);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        loadPodsData();
      }
    };
    effect();
  }, []);

  const headers = [
    { label: "Booking Id", key: "podId" },
    { label: "Booking Date", key: "bookingDate" },
    { label: "Booking Purpose", key: "bookingPurpose" },
    { label: "Start Time", key: "startTime" },
    { label: "End Time", key: "endTime" },
    { label: "Status", key: "status" },
  ];

  const csvReport = {
    filename: "Pods_data.csv",
    headers: headers,
    data: podsData,
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
              {loading
                ? [1, 2, 3, 4, 5].map((n) => (
                    <TableRow key={n}>
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={50}
                        />
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
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : podsData.map((pod) => (
                    <TableRow key={pod.id}>
                      <TableCell>
                        {pod.images && pod.images.length > 0 && (
                          <img
                            key={pod.images[0]._id}
                            src={`https://privily.co${pod.images[0].url}`}
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
                          color={pod.isBlocked === false ? "success" : "error"}
                          sx={{ borderRadius: "20px" }}
                        >
                          {pod.isBlocked === false ? "active" : "Inactive"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handleBlockUnblockPod(pod._id, pod.isBlocked)
                          }
                        >
                          {pod.isBlocked === false ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                        <IconButton onClick={() => handleEditIconClick(pod)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleConfirmDelete(pod._id)}
                        >
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
              Are you sure you want to delete this Pod?
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
            </Stack>
            <Stack spacing={2}>
              <Stack direction={"row"} gap={2}>
                <TextField
                  style={{ width: "33%" }}
                  required
                  fullWidth
                  label="User ID"
                  name="UserId"
                  value={formData.UserId}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Device ID"
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleInputChange}
                />
                <TextField
                  style={{ width: "33%" }}
                  required
                  fullWidth
                  label="Device Serial"
                  name="serial"
                  value={formData.serial}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Device Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Stack>
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
                    return location
                      ? `${location.name}, ${location.city}, ${location.state}, ${location.zip}`
                      : "Unknown Location";
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: "200px", // Set the maximum width of the dropdown menu
                        wordWrap: "break-word", // Ensure long text wraps to the next line
                      },
                    },
                  }}
                  sx={{ width: "200px" }}
                >
                  <MenuItem disabled value="">
                    <em>Select Location</em>
                  </MenuItem>
                  {locations.map((location) => (
                    <MenuItem
                      key={location._id}
                      value={location._id}
                      style={{ whiteSpace: "wrap" }}
                    >
                      {`${location.name}, ${location.city}, ${location.state}, ${location.zip}`}
                    </MenuItem>
                  ))}
                </Select>
                {errors.location && (
                  <Typography color="error">Location is required</Typography>
                )}
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
                {errors.features && (
                  <Typography color="error">
                    At least one feature is required
                  </Typography>
                )}
              </Stack>
              <Stack direction={"row"} gap={2}>
                <input type="file" multiple onChange={handleImageChange} />
              </Stack>

              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  style={{ width: "50%" }}
                  label="Booking Requirements"
                  name="booking_requirements"
                  value={formData.booking_requirements}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  style={{ width: "50%" }}
                  fullWidth
                  label="Google Maps Link"
                  name="direction"
                  value={formData.direction}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  style={{ width: "50%" }}
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                />
                <TextField
                  style={{ width: "50%" }}
                  required
                  fullWidth
                  label="Cancellation Policy"
                  name="cancellation_policy"
                  value={formData.cancellation_policy}
                  onChange={handleInputChange}
                />
              </Stack>
              <TextField
                style={{ width: "50%" }}
                required
                fullWidth
                label="Safety and Property"
                name="safety_and_property"
                value={formData.safety_and_property}
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
                Edit Product
              </Typography>
              <CloseIcon
                onClick={() => setEditModalOpen(false)}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
            <Stack spacing={2}>
              <Stack direction={"row"} gap={2}>
                <TextField
                  style={{ width: "33%" }}
                  required
                  fullWidth
                  label="User ID"
                  name="UserId"
                  value={editFormData.UserId}
                  onChange={handleEditInputChange}
                />
                <TextField
                  style={{ width: "33%" }}
                  required
                  fullWidth
                  label="Device ID"
                  name="deviceId"
                  value={editFormData.deviceId}
                  onChange={handleEditInputChange}
                />
                <TextField
                  style={{ width: "33%" }}
                  required
                  label="Device Serial"
                  name="serial"
                  value={editFormData.serial}
                  onChange={handleEditInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Device Password"
                  name="password"
                  value={editFormData.password}
                  onChange={handleEditInputChange}
                />
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                />
                <TextField
                  required
                  style={{ width: "33%" }}
                  label="Description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <Select
                  style={{ width: "50%" }}
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Select Location</em>;
                    }
                    const location = locations.find(
                      (location) => location._id === selected
                    );
                    return location
                      ? `${location.name}, ${location.city}, ${location.state}, ${location.zip}`
                      : "Unknown Location"; // Provide a meaningful fallback
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: "200px", // Set the maximum width of the dropdown menu
                        wordWrap: "break-word",
                      },
                    },
                  }}
                  sx={{ width: "200px" }}
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
                  value={editFormData.features}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      features: e.target.value,
                    })
                  }
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
                        checked={
                          editFormData.features.indexOf(feature._id) > -1
                        }
                      />
                      <ListItemText primary={feature.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack direction={"row"} gap={2}>
                <input
                  type="file"
                  multiple
                  onChange={handleEditImageChange} // New handler for image change
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  fullWidth
                  style={{ width: "50%" }}
                  label="Booking Requirements"
                  name="booking_requirements"
                  value={editFormData.booking_requirements}
                  onChange={handleEditInputChange}
                />
                <TextField
                  required
                  style={{ width: "50%" }}
                  fullWidth
                  label="Google Maps Link"
                  name="direction"
                  value={editFormData.direction}
                  onChange={handleEditInputChange}
                />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <TextField
                  required
                  style={{ width: "50%" }}
                  fullWidth
                  label="Availability"
                  name="availability"
                  value={editFormData.availability}
                  onChange={handleEditInputChange}
                />
                <TextField
                  style={{ width: "50%" }}
                  required
                  fullWidth
                  label="Cancellation Policy"
                  name="cancellation_policy"
                  value={editFormData.cancellation_policy}
                  onChange={handleEditInputChange}
                />
              </Stack>
              <TextField
                style={{ width: "50%" }}
                required
                fullWidth
                label="Safety and Property"
                name="safety_and_property"
                value={editFormData.safety_and_property}
                onChange={handleEditInputChange}
              />
            </Stack>
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
