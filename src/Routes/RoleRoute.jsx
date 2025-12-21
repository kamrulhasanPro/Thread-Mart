import React, { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { Navigate, useLocation } from "react-router";
import { axiosPublic } from "../Hooks/axiosPublic";
import useRole from "../Hooks/useRole";

const RoleRoute = ({ verifyRol, children }) => {
  const { user, loader, setLoader } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation().pathname;

  if (loader || isLoading) return <Loading className={"!min-h-screen"} />;

  if (!user) return <Navigate to={"/login"} state={location} />;

  if (!verifyRol.includes(role)) {
    return <div>Forbidden User . not access for you</div>;
  }
  return children;
};

export default RoleRoute;
