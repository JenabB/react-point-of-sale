import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from ".";
import { Loader } from "../../common/components";
import SideMenu from "./components/SideMenu";
import { PageHeader } from "antd";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { ShopActions } from "../shop";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const isLoading = useAppSelector(DashboardSelectors.selectRequestStatus);
  const shop = useAppSelector(DashboardSelectors.selectShop);

  useEffect(() => {
    dispatch(DashboardActions.getUser());
    dispatch(DashboardActions.getShopById(id));
    dispatch(DashboardActions.getProducts(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader show={true} />;

  if (!shop) return <Navigate to="/shop" />;

  return (
    <div>
      <Header shop={shop} />
      <div className="dashboard-container">
        <SideMenu />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
