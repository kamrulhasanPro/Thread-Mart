import React from "react";
import { NavLink } from "react-router";

const DashboardItemsLink = ({ icon, navName, to, className }) => {
  const defaultStyle = `is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg text-secondary-content hover:text-primary transition ${className}`;
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `text-semibold !text-primary ${defaultStyle}`
            : defaultStyle
        }
        data-tip={navName}
      >
        <div className="w-5 h-5 flex items-center justify-center my-1.5 size-4">
          {icon}
        </div>
        <span className="is-drawer-close:hidden text-nowrap">{navName}</span>
      </NavLink>
    </li>
  );
};

export default DashboardItemsLink;
