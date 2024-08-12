import React, { useEffect, useState } from "react";
import { Card, Typography, Stack } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import "./all.css"
const PodsSlide = ({ pods }) => {
    console.log("pods", pods);
  const features = [
    {
      icon: (
        <ChairRoundedIcon
          sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
        />
      ),
    },
    {
      icon: (
        <WifiRoundedIcon
          sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
        />
      ),
    },
    {
      icon: (
        <NotificationsOffRoundedIcon
          sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
        />
      ),
    },
  ];
//   const [Cards, setCards] = useState([]);
//   useEffect(() => {
//     const getCastingCallsdetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://hammerhead-app-lqsdj.ondigitalocean.app/api/product",
//           {
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//           }
//         );
//         setCards(response.data);
//         console.log("resp", response);
//         console.log("Cards", Cards);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getCastingCallsdetails();
//   }, []);
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
    <Stack sx={{ width: { lg: "98%", xs: "93%" } }} padding={"40px 0 40px 20px"}>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{ marginBottom: 2, color: "#ED3327" }}
      >
        Pods to Explore
      </Typography>
      <Carousel responsive={responsive}>
        {pods?.map((d, index) => (
          <Stack
            sx={{
              
              width: { lg: "100%", md: "30%", sm: "95%", xs: "95%" },
              borderRadius: "25px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            key={index}
          >
            <Stack
              alignItems="center"
              spacing={2}
              p={{ lg: "10px", md: 2, sm: 2, xs: 1 }}
            >
              {d.images && d.images?.length > 0 && (
                <img
                  src={`https://hammerhead-app-lqsdj.ondigitalocean.app${d.images[0].url}`}
                  className="Images-correct"
                  style={{
                    width: "72%",
                    objectFit: "contain",
                    borderRadius: "16px 16px 0 0",
                  }}
                />
              )}
            </Stack>
            <Stack sx={{ p: "2px 10px 10px 17px" }}>
              <Typography
                fontSize={{ lg: "18px", xs: "15px" }}
                fontWeight={"bold"}
                textAlign={"left"}
                gutterBottom
              >
                {d.title}
              </Typography>
              <Typography
                fontSize={{ lg: "17px", xs: "10px" }}
                textAlign={"left"}
                gutterBottom
              >
                {d.address}
              </Typography>
              {/* <Stack
                direction={"row"}
                gap={{ lg: "30px", sm: "10px", xs: 1 }}
                display={"flex"}
              >
                {features.map((feature, index) => (
                  <Stack key={index} direction={"row"} gap={3}>
                    <Stack justifyContent={"center"} color={"grey"}>
                      {feature.icon}
                    </Stack>
                  </Stack>
                ))}
                <Stack
                  gap="4px"
                  direction="row"
                  alignItems={"center"}
                  sx={{
                    bgcolor: "#1D9740",
                    color: "white",
                    borderRadius: "40px",
                    padding: { lg: "5px 15px 5px 15px", xs: "2px 7px 3px 7px" },
                    fontWeight: "bold",
                    fontSize: {
                      lg: "26px",
                      md: "20px",
                      sm: "16px",
                      xss: "17px",
                      xs: "12px",
                    },
                  }}
                >
                  {d.rating}
                  <StarIcon
                    sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
                  />
                </Stack>
              </Stack> */}
            </Stack>
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
};

export default PodsSlide;
