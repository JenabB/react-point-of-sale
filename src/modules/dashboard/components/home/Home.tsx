import React from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { Typography, Card } from "antd";
import { DashboardSelectors } from "../..";

const Home = () => {
  const shop = useAppSelector(DashboardSelectors.selectShop);
  return (
    <div>
      <Card title={shop.shopName}>
        <Typography>{shop.address}</Typography>
      </Card>
    </div>
  );
};

export default Home;
