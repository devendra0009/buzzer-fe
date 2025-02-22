import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../helpers/helpers";

// Dummy authentication check (replace with real authentication logic)
const isAuthenticated = () => {
  console.log(getTokenFromLocalStorage());

  return getTokenFromLocalStorage() !== null;
};

const PrivateAuthRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children; // Render the protected route
};

export default PrivateAuthRoute;
