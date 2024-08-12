
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
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Delete, Edit } from "@mui/icons-material";
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

  // State for Add Staff modal
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    auth_page: [],
  });

  // State for Edit Staff modal
  const [verifying, setVerifying] = useState(true);
  const [editStaffModalOpen, setEditStaffModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [editStaff, setEditStaff] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    auth_page: [],
  });

  // Key-value pairs for authorization pages
  const authPagesMapping = {
    Dashboard: "1",
    Features: "2",
    Pods: "3",
    Trasactions: "4",
    Users: "5",
    Bookings: "6",
    Locations: "7",
    Assignrole: "8",
    VipBooking:"9"
  };

  const authPages = Object.keys(authPagesMapping);

  useEffect(() => {
    const effect = async () => {
      setVerifying(true)
      let res = await verifyUser(8);
      setUserVerified(res);
      setVerifying(false)
      if (res) {
        fetchPodsData();
      }
    };
    effect();
  }, []);

  const fetchPodsData = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/all-staff",
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

  const handleBlockUnblockUser = async (userId, isBlocked) => {
    console.log("userId", userId);
    try {
      const url = isBlocked
        ? `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/unblock-staff/${userId}`
        : `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/block-staff/${userId}`;
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
      await axios.delete(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/delete-staff/${deleteUserId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
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

  const handleAddStaff = async () => {
    const newStaffData = {
      ...newStaff,
      auth_page: newStaff.auth_page.map((page) => authPagesMapping[page]),
    };

    try {
      const response = await axios.post(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/register-staff",
        newStaffData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setModalMessage("Staff added successfully");
      setModalOpen(true);
      setAddStaffModalOpen(false);
      fetchPodsData(); // Refresh the user data
    } catch (error) {
      console.error("Error adding staff: ", error);
    }
  };

  const handleEditStaff = async () => {
    const editStaffData = {
      ...editStaff,
      auth_page: editStaff.auth_page.map((page) => authPagesMapping[page]),
    };
 if (!editStaff.password) {
   delete editStaffData.password;
 }
    try {
      const response = await axios.put(
        `https://hammerhead-app-lqsdj.ondigitalocean.app/api/user/edit-staff/${currentStaff._id}`,
        editStaffData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setModalMessage("Staff updated successfully");
      setModalOpen(true);
      setEditStaffModalOpen(false);
      fetchPodsData(); // Refresh the user data
    } catch (error) {
      console.error("Error editing staff: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewStaff((prev) => {
      const updatedAuthPages = checked
        ? [...prev.auth_page, value]
        : prev.auth_page.filter((page) => page !== value);
      return {
        ...prev,
        auth_page: updatedAuthPages,
      };
    });
  };

  const handleEditCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEditStaff((prev) => {
      const updatedAuthPages = checked
        ? [...prev.auth_page, value]
        : prev.auth_page.filter((page) => page !== value);
      return {
        ...prev,
        auth_page: updatedAuthPages,
      };
    });
  };

  const handleEditIconClick = (staff) => {
    setCurrentStaff(staff);
    setEditStaff({
      firstname: staff.firstname,
      lastname: staff.lastname,
      email: staff.email,
      mobile: staff.mobile,
      password: "",
      role: staff.role,
      auth_page: staff.auth_page.map((page) =>
        Object.keys(authPagesMapping).find(
          (key) => authPagesMapping[key] === page
        )
      ),
    });
    setEditStaffModalOpen(true);
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
          Assign a role
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
              All Members ({podsData.length})
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setAddStaffModalOpen(true)}
            >
              Add Staff
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
                      {pod.isBlocked === false ? "Active" : "Inactive"}
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
                    <IconButton onClick={() => handleEditIconClick(pod)}>
                      <Edit />
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
              Message
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {modalMessage}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setModalOpen(false)}
            >
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
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="error" onClick={confirmDelete}>
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={() => setConfirmModalOpen(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Add Staff Modal */}
        <Modal
          open={addStaffModalOpen}
          onClose={() => setAddStaffModalOpen(false)}
          aria-labelledby="add-staff-modal-title"
          aria-describedby="add-staff-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: "20px",
              p: 4,
            }}
          >
            <Typography id="add-staff-modal-title" variant="h6" component="h2">
              Add New Staff
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={"row"} gap={5}>
                <TextField
                  label="First Name"
                  name="firstname"
                  value={newStaff.firstname}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={newStaff.lastname}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>

              <Stack direction={"row"} gap={5}>
                <TextField
                  label="Email"
                  name="email"
                  value={newStaff.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={newStaff.mobile}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <Stack direction={"row"} gap={5}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={newStaff.password}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Role"
                  name="role"
                  value={newStaff.role}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <Typography variant="subtitle1">Authorization Pages</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {authPages.map((page) => (
                  <FormControlLabel
                    key={page}
                    control={
                      <Checkbox
                        checked={newStaff.auth_page.includes(page)}
                        onChange={handleCheckboxChange}
                        value={page}
                      />
                    }
                    label={page}
                  />
                ))}
              </Stack>
              <Button
                variant="contained"
                onClick={handleAddStaff}
                sx={{ mt: 2 }}
              >
                Add Staff
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Edit Staff Modal */}
        <Modal
          open={editStaffModalOpen}
          onClose={() => setEditStaffModalOpen(false)}
          aria-labelledby="edit-staff-modal-title"
          aria-describedby="edit-staff-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: "20px",
              p: 4,
            }}
          >
            <Typography id="edit-staff-modal-title" variant="h6" component="h2">
              Edit Staff
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={"row"} gap={5}>
                <TextField
                  label="First Name"
                  name="firstname"
                  value={editStaff.firstname}
                  onChange={handleEditChange}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={editStaff.lastname}
                  onChange={handleEditChange}
                  fullWidth
                />
              </Stack>

              <Stack direction={"row"} gap={5}>
                <TextField
                  label="Email"
                  name="email"
                  value={editStaff.email}
                  onChange={handleEditChange}
                  fullWidth
                />
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={editStaff.mobile}
                  onChange={handleEditChange}
                  fullWidth
                />
              </Stack>
              <Stack direction={"row"} gap={5}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={editStaff.password}
                  onChange={handleEditChange}
                  fullWidth
                />
                <TextField
                  label="Role"
                  name="role"
                  value={editStaff.role}
                  onChange={handleEditChange}
                  fullWidth
                />
              </Stack>
              <Typography variant="subtitle1">Authorization Pages</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {authPages.map((page) => (
                  <FormControlLabel
                    key={page}
                    control={
                      <Checkbox
                        checked={editStaff.auth_page.includes(page)}
                        onChange={handleEditCheckboxChange}
                        value={page}
                      />
                    }
                    label={page}
                  />
                ))}
              </Stack>
              <Button
                variant="contained"
                onClick={handleEditStaff}
                sx={{ mt: 2 }}
              >
                Edit Staff
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    );
  }
};

export default UserDetails;
