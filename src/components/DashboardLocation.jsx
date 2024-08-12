import React, { useEffect, useState } from "react";
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";

const DashboardLocation = ({ Location }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Stack sx={{ width: { lg: "100%", xs: "93%" } }}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{ marginBottom: 2, color: "#ED3327" }}
      >
        Location
      </Typography>
      <Carousel responsive={responsive} className="hii">
        {Location.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location._id} gap={2}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Carousel>
    </Stack>
  );
};

export default DashboardLocation;

