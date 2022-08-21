import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "./modules/auth";
import { useAppSelector } from "./common/state/hooks";
import { Dashboard } from "./modules/dashboard";

import Home from "./modules/dashboard/components/home/Home";
import Products from "./modules/dashboard/components/products/Products";
import Shop from "./modules/shop/Shop";
import Invoices from "./modules/dashboard/components/invoices/Invoices";
import jwtDecode from "jwt-decode";

const App = () => {
  // const token: any = sessionStorage.getItem("pos-token");

  // const exp: any = jwtDecode(token);
  // const date = new Date(exp.exp);

  // const isExp = new Date() > date;

  // console.log(isExp);

  return (
    <div>
      <Routes>
        {/* {isExp ? <Navigate to="/" /> : <Navigate to="/dashboard" />} */}
        <Route path="/" element={<Login />} />
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/dashboard/:id" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
