import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./modules/auth";
import { useAppSelector } from "./common/state/hooks";
import { DashboardSelectors, Dashboard } from "./modules/dashboard";
import { Navigate } from "react-router-dom";

const App = () => {
  // const user = useAppSelector(DashboardSelectors.selectUserRoot);
  const user = sessionStorage.getItem("pos-token");
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
