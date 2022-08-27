import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from ".";
import { Loader } from "../../common/components";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";
import { Navigate, useParams } from "react-router-dom";
import { ProductActions, InvoiceActions } from "./action";
import { ShopActions } from "../shop";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // const isLoading = useAppSelector(DashboardSelectors.selectRequestStatus);
  const { data } = useAppSelector(DashboardSelectors.selectShop);
  const { isLoading } = useAppSelector(DashboardSelectors.selectShop);

  useEffect(() => {
    dispatch(DashboardActions.getUser());
    dispatch(DashboardActions.getShopById(id));
    dispatch(ShopActions.getOwnerShops());
    dispatch(ProductActions.getProducts(id));
    dispatch(InvoiceActions.getInvoices(id));
  }, [dispatch, id]);

  if (isLoading || !data) return <Loader show={true} />;

  // if (!shop) return <Navigate to="/shop" />;

  return (
    <div>
      <Header shop={data} />
      <div className="dashboard-container">
        <SideMenu />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
