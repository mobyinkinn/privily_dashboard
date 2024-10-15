// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/Authcontext";
// import axios from "axios";
// import Chart from "chart.js/auto"; // Import Chart.js for the charts
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Card, Stack, Typography } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
// import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
// import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
// const DashboardContainer = styled.div`
//   display:flex;
//   flex-direction:row;
//     gap: 20px;
//     padding: 20px;
//   `;

// const Widget = styled.div`
//   background: #fff;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
// `;


// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 2,
//   },
// };

// const Dashboard = () => {
//   const [data, setData] = useState({});
//   const { auth } = useAuth();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/api/dashboard/${
//           auth?.user?._id || ""
//         }`
//       );
//       const data = response.data.data;
//       setData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data.userDetails) {
//       // Initialize charts when data is loaded
//       const ctx1 = document
//         .getElementById("userVisitorInsights")
//         .getContext("2d");
//       new Chart(ctx1, {
//         type: "line",
//         data: {
//           labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ],
//           datasets: [
//             {
//               label: "Minimum Customers",
//               data: [10, 20, 15, 30, 25, 35, 20, 40, 30, 50, 45, 60],
//               borderColor: "red",
//               fill: false,
//             },
//             {
//               label: "Average Customers",
//               data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
//               borderColor: "green",
//               fill: false,
//             },
//             {
//               label: "Maximum Customers",
//               data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
//               borderColor: "purple",
//               fill: false,
//             },
//           ],
//         },
//       });

//       const ctx2 = document.getElementById("bookingSummary").getContext("2d");
//       new Chart(ctx2, {
//         type: "bar",
//         data: {
//           labels: [
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//             "Sunday",
//           ],
//           datasets: [
//             {
//               label: "Upcoming",
//               data: [10, 15, 20, 25, 30, 35, 40],
//               backgroundColor: "blue",
//             },
//             {
//               label: "Complete",
//               data: [5, 10, 15, 20, 25, 30, 35],
//               backgroundColor: "green",
//             },
//           ],
//         },
//       });

//       const ctx3 = document
//         .getElementById("customerSatisfaction")
//         .getContext("2d");
//       new Chart(ctx3, {
//         type: "line",
//         data: {
//           labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ],
//           datasets: [
//             {
//               label: "No",
//               data: [10, 20, 15, 30, 25, 35, 20, 40, 30, 50, 45, 60],
//               borderColor: "blue",
//               fill: false,
//             },
//             {
//               label: "Yes",
//               data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
//               borderColor: "green",
//               fill: false,
//             },
//           ],
//         },
//       });

//       const ctx4 = document.getElementById("targetVsReality").getContext("2d");
//       new Chart(ctx4, {
//         type: "bar",
//         data: {
//           labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//           datasets: [
//             {
//               label: "Reality Sales",
//               data: [8.823, 9.823, 10.823, 11.823, 12.823, 13.823, 14.823],
//               backgroundColor: "yellow",
//             },
//             {
//               label: "Target Sales",
//               data: [12.122, 13.122, 14.122, 15.122, 16.122, 17.122, 18.122],
//               backgroundColor: "green",
//             },
//           ],
//         },
//       });

//       const ctx5 = document
//         .getElementById("newAdminPerformance")
//         .getContext("2d");
//       new Chart(ctx5, {
//         type: "bar",
//         data: {
//           labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//           datasets: [
//             {
//               label: "High",
//               data: [15, 25, 35, 45, 55, 65, 75],
//               backgroundColor: "blue",
//             },
//             {
//               label: "Low",
//               data: [5, 15, 25, 35, 45, 55, 65],
//               backgroundColor: "green",
//             },
//           ],
//         },
//       });
//     }
//   }, [data]);
// const features = [
//   {
//     icon: (
//       <ChairRoundedIcon
//         sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
//       />
//     ),
//   },
//   {
//     icon: (
//       <WifiRoundedIcon
//         sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
//       />
//     ),
//   },
//   {
//     icon: (
//       <NotificationsOffRoundedIcon
//         sx={{ fontSize: { xss: "20px", xs: "13px", lg: "30px" } }}
//       />
//     ),
//   },
// ];
//   return (
//     <DashboardContainer>
//       <Widget>
//         <h3>Pods to Explore</h3>
//         {data.pods && (
//           <Carousel responsive={responsive} className="hii">
//             {data.pods.map((d, index) => (
//               <Card
//                 sx={{
//                   width: { lg: "90%", md: "30%", sm: "95%", xs: "95%" },
//                   //   maxWidth: "380px",
//                   borderRadius: "25px",
//                   backgroundColor: "white",
//                   cursor: "pointer",
//                 }}
//                 key={index}
//               >
//                 <Stack
//                   alignItems="center"
//                   spacing={2}
//                   p={{ lg: "10px", md: 2, sm: 2, xs: 1 }}
//                 >
//                   {/* {d.images.map((image) => (
//                 <Box
//                   sx={{
//                     height: "auto",
//                     width: "100%",
//                     borderRadius: "16px 16px 0 0",
//                   }}
//                 > */}
//                   {d.images && d.images.length > 0 && (
//                     <img
//                       src={`http://localhost:4000${d.images[0].url}`}
//                       className="Images-correct"
//                       style={{
//                         width: "100%",
//                         objectFit: "contain",
//                         borderRadius: "16px 16px 0 0",
//                       }}
//                     />
//                   )}
//                   {/* </Box>
//               ))} */}
//                 </Stack>
//                 <Stack sx={{ p: "2px 10px 10px 17px" }}>
//                   <Typography
//                     fontSize={{ lg: "24px", xs: "15px" }}
//                     fontWeight={"bold"}
//                     textAlign={"left"}
//                     gutterBottom
//                   >
//                     {d.title}
//                   </Typography>
//                   <Typography
//                     fontSize={{ lg: "17px", xs: "10px" }}
//                     textAlign={"left"}
//                     gutterBottom
//                   >
//                     {d.address}
//                   </Typography>
//                   <Stack
//                     direction={"row"}
//                     gap={{ lg: "30px", sm: "10px", xs: 1 }}
//                     display={"flex"}
//                   >
//                     {features.map((feature, index) => (
//                       <Stack key={index} direction={"row"} gap={3}>
//                         <Stack justifyContent={"center"} color={"grey"}>
//                           {" "}
//                           {feature.icon}
//                         </Stack>
//                       </Stack>
//                     ))}
//                     <Stack
//                       gap="4px"
//                       direction="row"
//                       alignItems={"center"}
//                       sx={{
//                         bgcolor: "#1D9740",
//                         color: "white",
//                         // width: { lg: "80px"},
//                         borderRadius: "40px",
//                         padding: {
//                           lg: "5px 15px 5px 15px",
//                           xs: "2px 7px 3px 7px",
//                         },
//                         fontWeight: "bold",
//                         fontSize: {
//                           lg: "26px",
//                           md: "20px",
//                           sm: "16px",
//                           xss: "17px",
//                           xs: "12px",
//                         },
//                       }}
//                     >
//                       {d.rating}
//                       <StarIcon
//                         sx={{
//                           fontSize: { xss: "20px", xs: "13px", lg: "30px" },
//                         }}
//                       />
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </Card>
//             ))}
//           </Carousel>
//         )}
//       </Widget>

//       <Widget>
//         <canvas id="userVisitorInsights"></canvas>
//       </Widget>

//       <Widget>
//         <canvas id="bookingSummary"></canvas>
//       </Widget>

//       <Widget>
//         <canvas id="customerSatisfaction"></canvas>
//       </Widget>

//       <Widget>
//         <canvas id="targetVsReality"></canvas>
//       </Widget>

//       <Widget>
//         <h3>VIP Booking</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Time Used</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.userDetails
//               ?.filter((user) => user.role === "admin")
//               .map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {user.firstname} {user.lastname}
//                   </td>
//                   <td>{Math.floor(Math.random() * 120) + 30} Min</td>
//                   <td>Active</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </Widget>

//       <Widget>
//         <h3>Pods Location</h3>
//         <div>
//           <img src="https://via.placeholder.com/300x200" alt="World Map" />
//         </div>
//       </Widget>

//       <Widget>
//         <canvas id="newAdminPerformance"></canvas>
//       </Widget>
//     </DashboardContainer>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../context/Authcontext";
// import axios from "axios";
// import Chart from "chart.js/auto"; // Import Chart.js for the charts
// import "react-multi-carousel/lib/styles.css";
// import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
// import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
// import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
// import PodsSlide from "./PodsSlide";
// import DashboardFeatures from "./DashboardFeatures";
// import NoAccess from "./NoAccess";
// import DashboardBooking from "./DashboardBooking";
// import DashboardTransaction from "./DashboardTransaction";
// import DashboardLocation from "./DashboardLocation";
// import DashboardUserDetail from "./DashboardUserDetail";


// const Dashboard = () => {
//   const [data, setData] = useState({});
//   const [pods, setpods] = useState([]);
//   const [Features, setFeatures] = useState([])
//   const [Booking, setBooking] = useState([])
//   const [Transaction, setTransaction] = useState([]);
//   const [Location, setLocation] = useState([])
//   const [UserDetail, setUserDetail] = useState([])
//   const { auth } = useAuth();
// const [userVerified, setUserVerified] = useState(false);
// const { verifyUser } = useAuth();
// const [verifying, setVerifying] = useState(true);

// useEffect(() => {
//   const effect = async () => {
//     setVerifying(true);
//     let res = await verifyUser(2);
//     setUserVerified(res);
//     setVerifying(false);
//     if (res) {
//     }
//   };
//   effect();
// }, []);
//  const fetchData = async () => {
//    try {
//      const userId = auth?.user?._id || auth?._id;
//      if (!userId) {
//        throw new Error("User ID is missing in the auth object");
//      }

//      const response = await axios.get(
//        `http://localhost:4000/api/dashboard/${userId}`
//      );

//      const Alldata = response.data.data;
//      console.log("Fetched data:", Alldata);

//      setData(data);
//      setpods(Alldata.pods);
//      setFeatures(Alldata.feature);
//      setBooking(Alldata.bookings);
//      setTransaction(Alldata.Transaction);
//      setLocation(Alldata.location);
//      setUserDetail(Alldata.userDetails);
//    } catch (error) {
//      console.error("Error fetching data:", error.message);
//    }
//  };


//   useEffect(() => {
//     fetchData();
//   }, []);


//  if (verifying) {
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
//   return (
//     <Stack width={"100%"} direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
//       <Stack width={"48%"}>
//         <PodsSlide pods={pods} />
//         <DashboardFeatures Features={Features} />
//         <DashboardTransaction Transaction={Transaction} />
//       </Stack>
//       <Stack width={"48%"}>
//         <DashboardBooking Booking={Booking} />
//         <DashboardLocation Location={Location} />
//         <DashboardUserDetail UserDetail={UserDetail} />
//       </Stack>
//     </Stack>
//   );
// };
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js for the charts
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import ChairRoundedIcon from "@mui/icons-material/ChairRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import PodsSlide from "./PodsSlide";
import DashboardFeatures from "./DashboardFeatures";
import NoAccess from "./NoAccess";
import DashboardBooking from "./DashboardBooking";
import DashboardTransaction from "./DashboardTransaction";
import DashboardLocation from "./DashboardLocation";
import DashboardUserDetail from "./DashboardUserDetail";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [pods, setPods] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [Booking, setBooking] = useState([]);
  const [Transaction, setTransaction] = useState([]);
  const [Location, setLocation] = useState([]);
  const [UserDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading effect
  const { auth } = useAuth();
  const [userVerified, setUserVerified] = useState(false);
  const { verifyUser } = useAuth();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const effect = async () => {
      setVerifying(true);
      let res = await verifyUser(2);
      setUserVerified(res);
      setVerifying(false);
      if (res) {
        fetchData(); // Fetch data only after user is verified
      }
    };
    effect();
  }, []);

  const fetchData = async () => {
    try {
      const userId = auth?.user?._id || auth?._id;
      if (!userId) {
        throw new Error("User ID is missing in the auth object");
      }

      const response = await axios.get(
        `http://localhost:4000/api/dashboard/${userId}`
      );

      const Alldata = response.data.data;
      console.log("Fetched data:", Alldata);

      setData(Alldata);
      setPods(Alldata.pods);
      setFeatures(Alldata.feature);
      setBooking(Alldata.bookings);
      setTransaction(Alldata.Transaction);
      setLocation(Alldata.location);
      setUserDetail(Alldata.userDetails);
      setLoading(false); // Set loading to false after data is loaded
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false); // Set loading to false even if there's an error
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
      <Stack
        width={"100%"}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        {/* Left Column */}
        <Stack width={"48%"}>
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for PodsSlide
          ) : (
            <PodsSlide pods={pods} />
          )}
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for DashboardFeatures
          ) : (
            <DashboardFeatures Features={Features} />
          )}
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for DashboardTransaction
          ) : (
            <DashboardTransaction Transaction={Transaction} />
          )}
        </Stack>

        {/* Right Column */}
        <Stack width={"48%"}>
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for DashboardBooking
          ) : (
            <DashboardBooking Booking={Booking} />
          )}
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for DashboardLocation
          ) : (
            <DashboardLocation Location={Location} />
          )}
          {loading ? (
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} /> // Skeleton for DashboardUserDetail
          ) : (
            <DashboardUserDetail UserDetail={UserDetail} />
          )}
        </Stack>
      </Stack>
    );
  }
};

export default Dashboard;
