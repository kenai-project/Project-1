import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const PrivateRoute = ({ roles, children }) => {
  const user = AuthService.getCurrentUser();

  if (!user || !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
