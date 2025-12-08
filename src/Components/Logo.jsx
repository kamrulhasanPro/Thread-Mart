import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src="/logo.png" alt="Logo" className="w-20" />
    </Link>
  );
};

export default Logo;
