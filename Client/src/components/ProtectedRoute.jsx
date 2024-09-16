// /src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/"} />;
  }

  return children;
};

export default ProtectedRoute;
