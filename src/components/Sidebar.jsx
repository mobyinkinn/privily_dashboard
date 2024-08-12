// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import PeopleIcon from "@mui/icons-material/People";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import PlaceIcon from "@mui/icons-material/Place";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import logo from "../assest/Logo.png";
// import { Button, Stack } from "@mui/material";

// const SidebarContainer = styled.div`
//   width: 264px;
//   height: 80vh;
//   // background-color: #fff;
//   // box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
// `;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #ff6f61;
//   text-align: center;
//   margin: 20px 0;
// `;

// const Menu = styled.div`
//   flex-grow: 1;
//   margin:10px;
// `;

// const MenuItem = styled(Link)`
//   display: flex;
//   align-items: center;
//   border-radius: 20px;
//   padding: 15px 20px;
//   color: ${(props) => (props.active ? "white" : "#333")};
//   text-decoration: none;
//   font-size: 18px;
//   background-color: ${(props) => (props.active ? "#ed3327" : "transparent")};

//   svg {
//     margin-right: 10px;
//     color: ${(props) => (props.active ? "#ff6f61" : "#333")};
//   }
// `;

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <Stack alignItems={"center"}>
//       <SidebarContainer>
//         <Logo>
//           <Link to="/">
//             <img src={logo} alt="" style={{ width: "173px", height: "50px" }} />
//           </Link>
//         </Logo>
//         <Menu>
//           <MenuItem to="/" active={location.pathname === "/"}>
//             <DashboardIcon sx={{ backgroundColor: "white" }} /> Dashboard
//           </MenuItem>
//           <MenuItem to="/pods" active={location.pathname === "/pods"}>
//             <ListAltIcon sx={{ backgroundColor: "white" }} /> Pods
//           </MenuItem>
//           <MenuItem
//             to="/vip-booking-pods"
//             active={location.pathname === "/vip-booking-pods"}
//           >
//             <EventNoteIcon sx={{ backgroundColor: "white" }} /> VIP Booking Pods
//           </MenuItem>
//           <MenuItem
//             to="/user-details"
//             active={location.pathname === "/user-details"}
//           >
//             <PeopleIcon sx={{ backgroundColor: "white" }} /> User Details
//           </MenuItem>
//           <MenuItem to="/booking" active={location.pathname === "/booking"}>
//             <EventNoteIcon sx={{ backgroundColor: "white" }} /> Booking
//           </MenuItem>
//           <MenuItem to="/location" active={location.pathname === "/location"}>
//             <PlaceIcon sx={{ backgroundColor: "white" }} /> Location
//           </MenuItem>
//           <MenuItem
//             to="/assign-role"
//             active={location.pathname === "/assign-role"}
//           >
//             <AssignmentIcon sx={{ backgroundColor: "white" }} /> Assign a Role
//           </MenuItem>
//           {/* <MenuItem to="/download" active={location.pathname === "/download"}>
//           <GetAppIcon sx={{ backgroundColor: "white" }} /> Download
//         </MenuItem>
//         <MenuItem to="/sign-out" active={location.pathname === "/sign-out"}>
//           <ExitToAppIcon sx={{ backgroundColor: "white" }} /> Sign Out
//         </MenuItem> */}
//         </Menu>
//       </SidebarContainer>
//       <Stack gap={2}>
//         <Button
//           startIcon={<GetAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Download App
//         </Button>
//         <Button
//           startIcon={<ExitToAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Sign Out
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default Sidebar;


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import PeopleIcon from "@mui/icons-material/People";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import PlaceIcon from "@mui/icons-material/Place";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import logo from "../assest/Logo.png";
// import { Button, Stack } from "@mui/material";

// const SidebarContainer = styled.div`
//   width: 264px;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: #fff;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
// `;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #ff6f61;
//   text-align: center;
//   margin: 20px 0;
// `;

// const Menu = styled.div`
//   flex-grow: 1;
//   margin: 10px;
// `;

// const MenuItem = styled(Link)`
//   display: flex;
//   align-items: center;
//   border-radius: 20px;
//   padding: 15px 20px;
//   color: ${(props) => (props.active ? "white" : "#333")};
//   text-decoration: none;
//   font-size: 18px;
//   background-color: ${(props) => (props.active ? "#ed3327" : "transparent")};

//   svg {
//     margin-right: 10px;
//     color: ${(props) => (props.active ? "#ff6f61" : "#333")};
//   }
// `;

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <SidebarContainer>
//       <Logo>
//         <Link to="/">
//           <img src={logo} alt="" style={{ width: "173px", height: "50px" }} />
//         </Link>
//       </Logo>
//       <Menu>
//         <MenuItem to="/" active={location.pathname === "/"}>
//           <DashboardIcon sx={{ backgroundColor: "white" }} /> Dashboard
//         </MenuItem>
//         <MenuItem to="/pods" active={location.pathname === "/pods"}>
//           <ListAltIcon sx={{ backgroundColor: "white" }} /> Pods
//         </MenuItem>
//         <MenuItem
//           to="/vip-booking-pods"
//           active={location.pathname === "/vip-booking-pods"}
//         >
//           <EventNoteIcon sx={{ backgroundColor: "white" }} /> VIP Booking Pods
//         </MenuItem>
//         <MenuItem
//           to="/user-details"
//           active={location.pathname === "/user-details"}
//         >
//           <PeopleIcon sx={{ backgroundColor: "white" }} /> User Details
//         </MenuItem>
//         <MenuItem to="/booking" active={location.pathname === "/booking"}>
//           <EventNoteIcon sx={{ backgroundColor: "white" }} /> Booking
//         </MenuItem>
//         <MenuItem to="/location" active={location.pathname === "/location"}>
//           <PlaceIcon sx={{ backgroundColor: "white" }} /> Location
//         </MenuItem>
//         <MenuItem
//           to="/assign-role"
//           active={location.pathname === "/assign-role"}
//         >
//           <AssignmentIcon sx={{ backgroundColor: "white" }} /> Assign a Role
//         </MenuItem>
//       </Menu>
//       <Stack gap={2} p={2}>
//         <Button
//           startIcon={<GetAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Download App
//         </Button>
//         <Button
//           startIcon={<ExitToAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Sign Out
//         </Button>
//       </Stack>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;


// import React, { useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import PeopleIcon from "@mui/icons-material/People";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import PlaceIcon from "@mui/icons-material/Place";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import logo from "../assest/Logo.png";
// import { Button, Stack } from "@mui/material";
// import { useAuth } from "../context/Authcontext";
// const SidebarContainer = styled.div`
//   width: 20%;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: #fff;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   z-index: 1000;
// `;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: #ff6f61;
//   text-align: center;
//   margin: 20px 0;
// `;

// const Menu = styled.div`
//   flex-grow: 1;
//   margin: 10px;
// `;

// const MenuItem = styled(Link)`
//   display: flex;
//   align-items: center;
//   border-radius: 20px;
//   padding: 15px 20px;
//   color: ${(props) => (props.active ? "white" : "#333")};
//   text-decoration: none;
//   font-size: 18px;
//   background-color: ${(props) => (props.active ? "#ed3327" : "transparent")};

//   svg {
//     margin-right: 10px;
//     color: ${(props) => (props.active ? "#ff6f61" : "#333")};
//   }
// `;

// const Sidebar = () => {
//   const location = useLocation();
// const { logout } = useAuth()
//   return (
//     <SidebarContainer>
//       <Logo>
//         <Link to="/">
//           <img src={logo} alt="" style={{ width: "173px", height: "50px" }} />
//         </Link>
//       </Logo>
//       <Menu>
//         <MenuItem to="/" active={location.pathname === "/"}>
//           <DashboardIcon sx={{ backgroundColor: "white" }} /> Dashboard
//         </MenuItem>
//         <MenuItem to="/features" active={location.pathname === "/features"}>
//           <ListAltIcon sx={{ backgroundColor: "white" }} /> Features
//         </MenuItem>
//         <MenuItem to="/pods" active={location.pathname === "/pods"}>
//           <ListAltIcon sx={{ backgroundColor: "white" }} /> Pods
//         </MenuItem>
//         <MenuItem
//           to="/vip-booking-pods"
//           active={location.pathname === "/vip-booking-pods"}
//         >
//           <EventNoteIcon sx={{ backgroundColor: "white" }} /> VIP Booking Pods
//         </MenuItem>
//         <MenuItem
//           to="/user-details"
//           active={location.pathname === "/user-details"}
//         >
//           <PeopleIcon sx={{ backgroundColor: "white" }} /> User Details
//         </MenuItem>
//         <MenuItem to="/booking" active={location.pathname === "/booking"}>
//           <EventNoteIcon sx={{ backgroundColor: "white" }} /> Booking
//         </MenuItem>
//         <MenuItem to="/location" active={location.pathname === "/location"}>
//           <PlaceIcon sx={{ backgroundColor: "white" }} /> Location
//         </MenuItem>
//         <MenuItem
//           to="/assign-role"
//           active={location.pathname === "/assign-role"}
//         >
//           <AssignmentIcon sx={{ backgroundColor: "white" }} /> Assign a Role
//         </MenuItem>
//       </Menu>
//       <Stack gap={2} p={2}>
//         <Button
//           startIcon={<GetAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Download App
//         </Button>
//         <Button
//           onClick={logout}
//           startIcon={<ExitToAppIcon />}
//           variant="contained"
//           sx={{
//             width: "200px",
//             backgroundColor: "#ED3327",
//             borderRadius: "10px",
//             "&:hover": {
//               bgcolor: "#ED3327",
//             },
//           }}
//         >
//           Sign Out
//         </Button>
//       </Stack>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PlaceIcon from "@mui/icons-material/Place";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GetAppIcon from "@mui/icons-material/GetApp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assest/Logo.png";
import { Button, Stack } from "@mui/material";
import { useAuth } from "../context/Authcontext";

const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ff6f61;
  text-align: center;
  margin: 20px 0;
`;

const Menu = styled.div`
  flex-grow: 1;
  margin: 10px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 15px 20px;
  color: ${(props) => (props.active ? "white" : "#333")};
  text-decoration: none;
  font-size: 18px;
  background-color: ${(props) => (props.active ? "#ed3327" : "transparent")};

  svg {
    margin-right: 10px;
    color: ${(props) => (props.active ? "#ff6f61" : "#333")};
  }
`;

const MenuItemText = styled.span`
  margin-left: 10px;
  color: ${(props) => (props.active ? "white" : "#333")};
`;
const Sidebar = ({ authorization_routes }) => {
  const location = useLocation();
   const navigate = useNavigate();
  const { logout } = useAuth();
const handleLogout = () => {
  logout();
  navigate("/login");
};
  return (
    <SidebarContainer>
      <Logo>
        <Link to="/">
          <img src={logo} alt="" style={{ width: "173px", height: "50px" }} />
        </Link>
      </Logo>
      <Menu>
        {/* {authorization_routes.map((route) => (
          <MenuItem
            key={route.id}
            to={route.path}
            active={location.pathname === route.path}
          >
            {route.id === 1 && (
              <DashboardIcon sx={{ backgroundColor: "white" }} />
              
            )}
            {route.id === 2 && (
              <ListAltIcon sx={{ backgroundColor: "white" }} />
            )}
            {route.id === 3 && (
              <ListAltIcon sx={{ backgroundColor: "white" }} />
            )}
            {route.id === 4 && (
              <EventNoteIcon sx={{ backgroundColor: "white" }} />
            )}
            {route.id === 5 && <PeopleIcon sx={{ backgroundColor: "white" }} />}
            {route.id === 6 && (
              <EventNoteIcon sx={{ backgroundColor: "white" }} />
            )}
            {route.id === 7 && <PlaceIcon sx={{ backgroundColor: "white" }} />}
            {route.id === 8 && (
              <AssignmentIcon sx={{ backgroundColor: "white" }} />
            )}
            {route.element.props.children}
          </MenuItem>
        ))} */}
        {authorization_routes.map((route) => (
          <MenuItem
            key={route.id}
            to={route.path}
            active={location.pathname === route.path ? 1 : 0}
          >
            {route.id === 1 && <DashboardIcon />}
            {route.id === 2 && <ListAltIcon />}
            {route.id === 3 && <ListAltIcon />}
            {route.id === 4 && <EventNoteIcon />}
            {route.id === 5 && <PeopleIcon />}
            {route.id === 6 && <EventNoteIcon />}
            {route.id === 7 && <PlaceIcon />}
            {route.id === 8 && <AssignmentIcon />}
            {route.id === 9 && <AssignmentIcon />}

            <MenuItemText active={location.pathname === route.path ? 1 : 0}>
              {route.name}
            </MenuItemText>
          </MenuItem>
        ))}
      </Menu>
      <Stack gap={2} p={2}>
        <Button
          startIcon={<GetAppIcon />}
          variant="contained"
          sx={{
            width: "200px",
            backgroundColor: "#ED3327",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#ED3327",
            },
          }}
        >
          Download App
        </Button>
        <Button
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
          variant="contained"
          sx={{
            width: "200px",
            backgroundColor: "#ED3327",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "#ED3327",
            },
          }}
        >
          Sign Out
        </Button>
      </Stack>
    </SidebarContainer>
  );
};

export default Sidebar;
