import React from "react";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation().pathname;
  if (loader) return <Loading className={"!min-h-screen"} />;
  if (!user) return <Navigate to={"/login"} state={location} />;
  return children;
};

export default PrivateRoute;
