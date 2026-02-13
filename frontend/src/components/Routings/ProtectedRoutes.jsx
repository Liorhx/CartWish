import React from "react";
import { getUser } from "../../services/userServices";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  console.log("Location", location);
  return getUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location.pathname} />
  );
};

export default ProtectedRoutes;
