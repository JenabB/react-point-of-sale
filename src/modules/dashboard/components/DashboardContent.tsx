import React from "react";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <Outlet />
    </div>
  );
};

export default DashboardContent;
