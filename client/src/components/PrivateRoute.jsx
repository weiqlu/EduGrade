/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
