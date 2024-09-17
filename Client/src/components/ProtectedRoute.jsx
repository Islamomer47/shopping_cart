import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  console.log("ProtectedRoute rendered");

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated:", isAuthenticated);

  // Retrieve the role from localStorage
  const userRole = localStorage.getItem("role");
  console.log("User Role from localStorage:", userRole);

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
