import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  console.log("ProtectedRoute rendered");

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated:", isAuthenticated);

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
      console.log("Decoded Role:", userRole);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    console.log(
      `User role ${userRole} does not match required role ${role}, redirecting...`
    );
    return <Navigate to={userRole === "admin" ? "/admin-dashboard" : "/"} />;
  }

  return children;
};

export default ProtectedRoute;
