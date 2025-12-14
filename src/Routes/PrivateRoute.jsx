import React from "react";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  if (loader) return <Loading />;
  if (!user) return <Navigate to={"/login"} />;
  return children;
};

export default PrivateRoute;
