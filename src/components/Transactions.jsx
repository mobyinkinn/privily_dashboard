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
//   Stack,
//   Box,
//   Typography,
//   Skeleton,
//   CircularProgress,
// } from "@mui/material";
// import { CSVLink } from "react-csv";
// import axios from "axios";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import { useAuth } from "../context/Authcontext";
// import NoAccess from "./NoAccess.jsx";
// import AddIcon from "@mui/icons-material/Add";

// const Transactions = () => {
//   const [newFeatureSign, setNewFeatureName] = useState("");

//   const [transactionsData, setTransactionsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [verifying, setVerifying] = useState(true);
//   const [userVerified, setUserVerified] = useState(false);
//   const { verifyUser } = useAuth();
//   const fetchTransactionsData = async () => {
//     try {
//       const response = await axios.get(
//         "https://hammerhead-app-lqsdj.ondigitalocean.app/api/transactions/getalltransactions",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3MjM4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
//           },
//         }
//       );
//       setTransactionsData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const effect = async () => {
//       setVerifying(true);
//       let res = await verifyUser(6);
//       setUserVerified(res);
//       setVerifying(false);
//       if (res) {
//         fetchTransactionsData();
//       }
//     };
//     effect();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-CA", options);
//   };

//   const formatTime = (dateString) => {
//     const options = { hour: "2-digit", minute: "2-digit" };
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-GB", options);
//   };

//   const headers = [
//     { label: "Transaction Id", key: "_id" },
//     { label: "Amount", key: "amount" },
//     { label: "Currency", key: "currency" },
//     { label: "Merchant Id", key: "merchantId" },
//     { label: "Checkout Id", key: "checkoutId" },
//     { label: "Payment Facilitator", key: "paymentFacilitator" },
//     { label: "Status", key: "status" },
//     { label: "Created At", key: "createdAt" },
//   ];

//   const csvReport = {
//     filename: "Transactions_Report.csv",
//     headers: headers,
//     data: transactionsData,
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
//           Transactions
//         </Typography>
//         <Stack justifyContent={"space-between"} direction={"row"}>
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
//               All Transactions ({transactionsData.length})
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={() =>                                                   (true)}
//             >Manage Rate
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
//                 <TableCell>Transaction Id</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Currency</TableCell>
//                 <TableCell>Merchant Id</TableCell>
//                 <TableCell>Checkout Id</TableCell>
//                 <TableCell>Payment Facilitator</TableCell>
//                 <TableCell>Status</TableCell>
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
//                 : transactionsData.map((transaction) => (
//                     <TableRow key={transaction._id}>
//                       <TableCell>{transaction._id}</TableCell>
//                       <TableCell>{transaction.amount}</TableCell>
//                       <TableCell>{transaction.currency}</TableCell>
//                       <TableCell>{transaction.merchantId}</TableCell>
//                       <TableCell>{transaction.checkoutId}</TableCell>
//                       <TableCell>{transaction.paymentFacilitator}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color={
//                             transaction.status === "completed"
//                               ? "success"
//                               : transaction.status === "created"
//                               ? "primary"
//                               : transaction.status === "pending"
//                               ? "warning"
//                               : "error"
//                           }
//                           sx={{ borderRadius: "20px" }}
//                         >
//                           {transaction.status}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     );
//   }
// };

// export default Transactions;
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
  Stack,
  Box,
  Typography,
  Skeleton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CSVLink } from "react-csv";
import axios from "axios";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import AddIcon from "@mui/icons-material/Add";

const Transactions = () => {
  const [newFeatureSign, setNewFeatureName] = useState("");

  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();
  const fetchTransactionsData = async () => {
    try {
      const response = await axios.get(
        "https://hammerhead-app-lqsdj.ondigitalocean.app/api/transactions/getalltransactions",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWRmZGYzMWVhNWIwZGYzNDg4ZTE2YSIsImlhdCI6MTcxODU5ODg3NiwiZXhwIjoxNzI3Mjg4ODc2fQ.q_tjVSj7xDcEodeNA9hxDioyjTXJ7-IaHA0z8xs1bHo",
          },
        }
      );
      setTransactionsData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(6);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        fetchTransactionsData();
      }
    };
    effect();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", options);
  };

  const headers = [
    { label: "Transaction Id", key: "_id" },
    { label: "Amount", key: "amount" },
    { label: "Currency", key: "currency" },
    { label: "Merchant Id", key: "merchantId" },
    { label: "Checkout Id", key: "checkoutId" },
    { label: "Payment Facilitator", key: "paymentFacilitator" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "createdAt" },
  ];

  const csvReport = {
    filename: "Transactions_Report.csv",
    headers: headers,
    data: transactionsData,
  };

  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState("");
  const [Showrate, setShowrate] = useState()
const fetchRate = async () => {
  try {
    const response = await axios.get(
      "https://hammerhead-app-lqsdj.ondigitalocean.app/api/transactions/getrate"
    );
    setShowrate(response.data.rate);
  } catch (error) {
    console.error("Error fetching rate:", error);
  }
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://hammerhead-app-lqsdj.ondigitalocean.app/api/transactions/ManageRates", {
        rate,
      });
      console.log("Rate created successfully:", response.data);
      handleClose();
      setRate("")
      fetchRate();
    } catch (error) {
      console.error("Error creating rate:", error);
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
      <Box sx={{ padding: "43px 5px" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "#ED3327" }}
        >
          Transactions
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
              All Transactions ({transactionsData.length})
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Manage Rate
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
                <TableCell>Transaction Id</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Merchant Id</TableCell>
                <TableCell>Checkout Id</TableCell>
                <TableCell>Payment Facilitator</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? [1, 2, 3, 4, 5].map((n) => (
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
                : transactionsData.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{transaction._id}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.currency}</TableCell>
                      <TableCell>{transaction.merchantId}</TableCell>
                      <TableCell>{transaction.checkoutId}</TableCell>
                      <TableCell>{transaction.paymentFacilitator}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={
                            transaction.status === "completed"
                              ? "success"
                              : transaction.status === "created"
                              ? "primary"
                              : transaction.status === "pending"
                              ? "warning"
                              : "error"
                          }
                          sx={{ borderRadius: "20px" }}
                        >
                          {transaction.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Manage Rate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the rate and status.
            </DialogContentText>
            <DialogContentText>
              Your current Base price is {Showrate} ZAR.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="rate"
              label="Rate"
              type="text"
              fullWidth
              variant="standard"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default Transactions;
