import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "./modules/auth";
import { useAppSelector } from "./common/state/hooks";
import { DashboardSelectors, Dashboard } from "./modules/dashboard";
import Ya from "./modules/dashboard/components/DashboardContent";
import DashboardContent from "./modules/dashboard/components/DashboardContent";
import Home from "./modules/dashboard/components/home/Home";
import Products from "./modules/dashboard/components/products/Products";
import Shop from "./modules/shop/Shop";

const App = () => {
  // const user = useAppSelector(DashboardSelectors.selectUserRoot);
  const user = sessionStorage.getItem("pos-token");

  return (
    <div>
      <Routes>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/dashboard/:id" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
