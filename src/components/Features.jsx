
import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Modal,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [error, setError] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  // Fetch features from the API
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
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {
    const effect = async () => {
      let res = await verifyUser(2);
      setUserVerified(res);
      if (res) {
        fetchFeatures();
      }
    };
    effect();
  }, []);

  // Handle input change for new feature
  const handleInputChange = (event) => {
    setNewFeatureName(event.target.value);
  };

  // Handle submit for creating new feature
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

  if (!userVerified) {
    return <NoAccess />;
  } else {
    return (
      <div>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "#ED3327" }}
        >
          Features
        </Typography>
        <List>
          {features.map((feature) => (
            <ListItem key={feature._id}>
              <ListItemText primary={feature.name} />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
          Create Feature
        </Button>
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
      </div>
    );
  }
};

export default Features;
