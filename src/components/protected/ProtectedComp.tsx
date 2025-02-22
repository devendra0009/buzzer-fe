import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../helpers/helpers";

// Dummy authentication check (replace with real authentication logic)
const isAuthenticated = () => {
//   console.log(getTokenFromLocalStorage());

  return getTokenFromLocalStorage() !== null;
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected route
};

export default PrivateRoute;
