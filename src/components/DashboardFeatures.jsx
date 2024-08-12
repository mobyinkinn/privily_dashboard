
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

const DashboardFeatures = ({ Features }) => {
    return (
      <Box sx={{ padding: "43px 5px" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "#ED3327" }}
        >
          Features
        </Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {loading
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
                    </TableRow>
                  )) */}
                
              {Features.map((feature) => (
                    <TableRow key={feature._id}>
                      <TableCell>{feature._id}</TableCell>
                      <TableCell>{feature.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={
                            feature.isBlocked === false ? "success" : "error"
                          }
                          sx={{ borderRadius: "20px" }}
                        >
                          {feature.isBlocked === false ? "active" : "Inactive"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    );
};

export default DashboardFeatures;
