import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ children, to, className }) => {
  const defaultStyle = `text-lg text-secondary-content hover:text-primary transition ${className}`;
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `text-semibold !text-primary ${defaultStyle}`
            : defaultStyle
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MyLink;
