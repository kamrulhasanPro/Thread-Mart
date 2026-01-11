import React, { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../Components/share/Loading";
import { Navigate, useLocation } from "react-router";
import { axiosPublic } from "../Hooks/axiosPublic";

const PrivateRoute = ({ children }) => {
  const { user, loader, setLoader } = useAuth();
  const location = useLocation().pathname;

  // refresh and reset login cookie stored
  useEffect(() => {
    if (user?.email) {
      setLoader(true);
      axiosPublic.post("/login", { email: user?.email });
      setLoader(false);
    }
  }, [user, setLoader]);

  if (loader) return <Loading className={"!min-h-screen"} />;
  if (!user) return <Navigate to={"/login"} state={location} />;
  return children;
};

export default PrivateRoute;
