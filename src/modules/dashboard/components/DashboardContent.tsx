import React from "react";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <div
      className="dashboard-content"
      style={{ maxHeight: "570px", overflowY: "scroll" }}
    >
      <Outlet />
    </div>
  );
};

export default DashboardContent;
