// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction:"row"
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// function App() {
//   return (
//     <Router>
//       <AppContainer sty>
//         <Sidebar />
//         <MainContent
//           style={{
//             marginLeft: "264px",
//             padding: "20px",
//             width: "calc(100% - 264px)",
//             height: "100vh",
//             overflowY: "auto",
//           }}
//         >
//           <Header />
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/pods" element={<Pods />} />
//             <Route path="/features" element={<Features />} />
//             <Route path="/vip-booking-pods" element={<VipBookingPods />} />
//             <Route path="/user-details" element={<UserDetails />} />
//             <Route path="/booking" element={<Booking />} />
//             <Route path="/location" element={<Location />} />
//             <Route path="/assign-role" element={<AssignRole />} />
//           </Routes>
//         </MainContent>
//       </AppContainer>
//     </Router>
//   );
// }

// export default App;

// src/App.js

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { user } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (user && user.auth_pages) {
//       const filteredRoutes = routes.filter((route) => user.auth_pages.includes(route.id));
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [user]);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <Router>
//       <AppContainer>
//         <Sidebar />
//         <MainContent>
//           <Header />
//           <Routes>
//             {authorizedRoutes.map((route) => (
//               <Route key={route.id} path={route.path} element={route.element} />
//             ))}
//           </Routes>
//         </MainContent>
//       </AppContainer>
//     </Router>
//   );
// }

// export default App;

// src/App.js

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { user } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (user && user.auth_pages) {
//       const filteredRoutes = routes.filter((route) => user.auth_pages.includes(route.id));
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [user]);

//   return (
//     <Router>
//       <AppContainer>
//         <Sidebar />
//         <MainContent>
//           <Header />
//           <Routes>
//             {user ? (
//               authorizedRoutes.map((route) => (
//                 <Route key={route.id} path={route.path} element={route.element} />
//               ))
//             ) : (
//               <>
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//               </>
//             )}
//           </Routes>
//         </MainContent>
//       </AppContainer>
//     </Router>
//   );
// }

// export default App;

// // src/App.js
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { user } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (user && user.auth_pages) {
//       const filteredRoutes = routes.filter((route) => user.auth_pages.includes(route.id));
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [user]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             user ? (
//               <AppContainer>
//                 <Sidebar />
//                 <MainContent>
//                   <Header />
//                   <Routes>
//                     {authorizedRoutes.map((route) => (
//                       <Route key={route.id} path={route.path} element={route.element} />
//                     ))}
//                     <Route path="*" element={<Navigate to="/" />} />
//                   </Routes>
//                 </MainContent>
//               </AppContainer>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// // src/App.js
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { user, isAuthenticated } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (user && user.auth_page) {
//       const filteredRoutes = routes.filter((route) => user.auth_page.includes(route.id.toString()));
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [user]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <AppContainer>
//                 <Sidebar />
//                 <MainContent>
//                   <Header />
//                   <Routes>
//                     {authorizedRoutes.map((route) => (
//                       <Route key={route.id} path={route.path} element={route.element} />
//                     ))}
//                     <Route path="*" element={<Navigate to="/" />} />
//                   </Routes>
//                 </MainContent>
//               </AppContainer>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { user, isAuthenticated } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (user && user.auth_page) {
//       // Filter routes based on user's auth_page array
//       const filteredRoutes = routes.filter((route) => user.auth_page.includes(route.id.toString()));
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [user]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <AppContainer>
//                 <Sidebar />
//                 <MainContent>
//                   <Header />
//                   <Routes>
//                     {authorizedRoutes.map((route) => (
//                       <Route key={route.id} path={route.path} element={route.element} />
//                     ))}
//                     <Route path="*" element={<Navigate to="/" />} />
//                   </Routes>
//                 </MainContent>
//               </AppContainer>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { isAuthenticated, auth } = useAuth();
//   const [authorizedRoutes, setAuthorizedRoutes] = useState([]);

//   useEffect(() => {
//     if (auth && auth.auth_page) {
//       // Filter routes based on user's auth_page array
//       const filteredRoutes = routes.filter((route) =>
//         auth.auth_page.includes(route.id.toString())
//       );
//       setAuthorizedRoutes(filteredRoutes);
//     }
//   }, [auth]);

//   console.log("auth", auth);
//   console.log("isAuthenticated", isAuthenticated());

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <AppContainer>
//                 <Sidebar />
//                 <MainContent>
//                   <Header />
//                   <Routes>
//                     {authorizedRoutes.map((route) => (
//                       <Route key={route.id} path={route.path} element={route.element} />
//                     ))}
//                     <Route path="*" element={<Navigate to="/" />} />
//                   </Routes>
//                 </MainContent>
//               </AppContainer>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import styled from "styled-components";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./components/Dashboard";
// import Pods from "./components/Pods";
// import VipBookingPods from "./components/VipBookingPods";
// import UserDetails from "./components/UserDetails";
// import Booking from "./components/Booking";
// import Location from "./components/Location";
// import AssignRole from "./components/AssignRole";
// import Features from "./components/Features";
// import LoginPage from "./context/LoginPage";
// import { useAuth } from "./context/Authcontext";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content:flex-end;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   width:78%;
//   position:absolute;
//   padding: 10px 10px;
//   background-color: #f0f2f5;
// `;

// const routes = [
//   { id: 1, path: "/", element: <Dashboard /> },
//   { id: 2, path: "/features", element: <Features /> },
//   { id: 3, path: "/pods", element: <Pods /> },
//   { id: 4, path: "/vip-booking-pods", element: <VipBookingPods /> },
//   { id: 5, path: "/user-details", element: <UserDetails /> },
//   { id: 6, path: "/booking", element: <Booking /> },
//   { id: 7, path: "/location", element: <Location /> },
//   { id: 8, path: "/assign-role", element: <AssignRole /> },
// ];

// function App() {
//   const { auth } = useAuth();
//  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const getAuthorizedRoutes = () => {
//     if (auth && auth.auth_page) {
//       return routes.filter((route) =>
//         auth.auth_page.includes(route.id.toString())
//       );
//     } else {
//       return [];
//     }
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="*"
//           element={
//             isAuthenticated ? (
//               <AppContainer>
//                 <Sidebar />
//                 <MainContent>
//                   <Header />
//                   <Routes>
//                     {getAuthorizedRoutes().map((route) => (
//                       <Route
//                         key={route.id}
//                         path={route.path}
//                         element={route.element}
//                       />
//                     ))}
//                     {/* Redirect to default route if no match */}
//                     <Route path="*" element={<Navigate to="/" />} />
//                   </Routes>
//                 </MainContent>
//               </AppContainer>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Pods from "./components/Pods";
import VipBookingPods from "./components/VipBookingPods";
import UserDetails from "./components/UserDetails";
import Booking from "./components/Booking";
import Location from "./components/Location";
import AssignRole from "./components/AssignRole";
import Features from "./components/Features";
import LoginPage from "./context/LoginPage";
import { useAuth } from "./context/Authcontext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const MainContent = styled.div`
  flex-grow: 1;
  width: 78%;
  position: absolute;
  padding: 10px 10px;
  background-color: #f0f2f5;
`;

const routes = [
  { id: 1, path: "/", element: <Dashboard />, name: "Dashboard" },
  { id: 2, path: "/features", element: <Features />, name: "Features" },
  { id: 3, path: "/pods", element: <Pods />, name: "Pods" },
  {
    id: 4,
    path: "/vip-booking-pods",
    element: <VipBookingPods />,
    name: "VIP Booking Pods",
  },
  {
    id: 5,
    path: "/user-details",
    element: <UserDetails />,
    name: "User Details",
  },
  { id: 6, path: "/booking", element: <Booking />, name: "Booking" },
  { id: 7, path: "/location", element: <Location />, name: "Location" },
  { id: 8, path: "/assign-role", element: <AssignRole />, name: "Assign Role" },
];

function App() {
  const { isAuthenticated, auth } = useAuth();
  const getAuthorizedRoutes = () => {
    const auth_page = auth?.auth_page;
    if (auth_page) {
      return routes.filter((route) => auth_page.includes(route.id.toString()));
    } else {
      return [];
    }
  };

  // const authorization_routes = getAuthorizedRoutes()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            isAuthenticated() || localStorage.getItem("token") ? (
              <AppContainer>
                <Sidebar authorization_routes={getAuthorizedRoutes()} />
                <MainContent>
                  <Header />
                  <Routes>
                    {getAuthorizedRoutes().map((route) => (
                      <Route
                        key={route.id}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                    {/* Redirect to default route if no match */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </MainContent>
              </AppContainer>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
