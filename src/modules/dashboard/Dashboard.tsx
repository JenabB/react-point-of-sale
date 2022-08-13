import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from ".";
import { Loader } from "../../common/components";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(DashboardSelectors.selectRequestStatus);
  const user = useAppSelector(DashboardSelectors.selectUserRoot);

  useEffect(() => {
    dispatch(DashboardActions.getUser());
  }, [dispatch]);

  if (isLoading) return <Loader show={true} />;

  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Dashboard;
