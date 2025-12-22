import React, { useEffect } from "react";
import { useLocation } from "react-router";

const ScreenToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
};

export default ScreenToTop;
