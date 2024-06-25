// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:4000/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUser(data.user); // Assuming your API returns a 'user' object upon successful login
//         localStorage.setItem("token", data.token); // Store token in localStorage for persistent login
//       } else {
//         throw new Error(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   const isAuthenticated = () => !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/context/AuthContext.js

// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:4000/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setUser(data.user); // Assuming your API returns a 'user' object upon successful login
//         localStorage.setItem("token", data.token); // Store token in localStorage for persistent login
//       } else {
//         throw new Error(data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   const isAuthenticated = () => !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/user/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const data = response.data;
//         setUser(data.user); // Assuming your API returns a 'user' object upon successful login
//         localStorage.setItem("token", data.token); // Store token in localStorage for persistent login
//       } else {
//         throw new Error(response.data.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   const isAuthenticated = () => !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authData = JSON.parse(localStorage.getItem("UserData"));
    if (token && authData) {
      setAuth({ token, auth_page: authData });
    }
  }, []);
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuth(data); // Set the authenticated user data
        localStorage.setItem("token", data.token); // Store token in localStorage for persistent login
        localStorage.setItem("UserData", JSON.stringify(data.auth_page)); // Store token in localStorage for persistent login
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
  };

  const isAuthenticated = () => !!auth;

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
