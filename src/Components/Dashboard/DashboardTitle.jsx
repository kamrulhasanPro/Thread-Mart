import React from "react";

const DashboardTitle = ({ children }) => {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-primary">{children}</h1>
      </div>
    </div>
  );
};

export default DashboardTitle;
