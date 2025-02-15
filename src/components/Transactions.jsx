

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
  Pagination,
} from "@mui/material";
import { CSVLink } from "react-csv";
import axios from "axios";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useAuth } from "../context/Authcontext";
import NoAccess from "./NoAccess.jsx";
import AddIcon from "@mui/icons-material/Add";
import { fetchTransactionsData, fetchRate, manageRate, manageDiscount, fetchDiscount } from "../api/api.js";
const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();

  // Add state variables for pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

 const [open, setOpen] = useState(false);
 const [open2, setopen2] = useState(false)
 const [rate, setRate] = useState("");
const [discount, setdiscount] = useState("")
 const [showRate, setShowRate] = useState();
 const [showDiscount, setShowDiscount] = useState();
const calculatedDiscount = showDiscount * showRate
 // Fetch transactions data using API function
 const loadTransactionsData = async () => {
   try {
     const data = await fetchTransactionsData();
     setTransactionsData(data.data);
     setLoading(false);
   } catch (error) {
     console.error("Error fetching data: ", error);
     setLoading(false);
   }
 };

 // Fetch current rate using API function
 const loadRate = async () => {
   try {
     const data = await fetchRate();
     setShowRate(data.rate);
   } catch (error) {
     console.error("Error fetching rate:", error);
   }
 };
const loadDiscount = async () => {
  try {
    const data = await fetchDiscount();
    setShowDiscount(data.discount);
  } catch (error) {
    console.error("Error fetching discount:", error);
  }
};
 useEffect(() => {
   const effect = async () => {
     setVerifying(true);
     let res = await verifyUser(4);
     setUserVerified(res);
     setVerifying(false);
     if (res) {
       loadTransactionsData();
       loadRate();
       loadDiscount()
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

 const handleClickOpen = () => {
   setOpen(true);
 };

 const handlediscount = ()=>{
setopen2(true);
 }

 const handlediscountclose = () => {
   setopen2(false);
 };
 const handleClose = () => {
   setOpen(false);
 };

 // Handle rate submission using API function
 const handleSubmit = async () => {
   try {
     const data = await manageRate(rate);
     console.log("Rate created successfully:", data);
     handleClose();
     setRate("");
     loadRate();
   } catch (error) {
     console.error("Error creating rate:", error);
   }
 };
const handleSubmitDiscount = async () => {
  try {
    const data = await manageDiscount(discount);
    console.log("discount created successfully:", data);
    handlediscountclose();
    setdiscount("");
    loadDiscount();
  } catch (error) {
    console.error("Error creating rate:", error);
  }
};
 // Pagination handling
 const handlePageChange = (event, value) => {
   setPage(value);
 };

 const displayedTransactions = transactionsData.slice(
   (page - 1) * itemsPerPage,
   page * itemsPerPage
 );

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
            <Stack gap={1} direction={"row"}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Manage Rate
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handlediscount}
              >
                Manage Discount
              </Button>
            </Stack>
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
                : displayedTransactions.map((transaction) => (
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
        {/* Add Pagination component here */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(transactionsData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Manage Rate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the rate and status.
            </DialogContentText>
            <DialogContentText>
              Your current Base price is {showRate} ZAR.
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
        <Dialog open={open2} onClose={handlediscountclose}>
          <DialogTitle>Manage discount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the Minutes of discount.
            </DialogContentText>
            <DialogContentText>
              Your current Base price is {showDiscount} min. so Your discounted
              amount is {showDiscount}*{showRate}={calculatedDiscount} ZAR.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="discount"
              label="discount"
              type="text"
              fullWidth
              variant="standard"
              value={discount}
              onChange={(e) => setdiscount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlediscountclose}>Cancel</Button>
            <Button onClick={handleSubmitDiscount}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default Transactions;
