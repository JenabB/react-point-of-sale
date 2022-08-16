import React from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { Typography, Card, Descriptions, Layout } from "antd";
import { DashboardSelectors } from "../..";
import { useState } from "react";

const Home = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");

  const { Content } = Layout;
  const shop = useAppSelector(DashboardSelectors.selectShop);
  return (
    <Content className="dashboard-content-item">
      <Descriptions title={shop.shopName} layout="vertical">
        <Descriptions.Item label="Address">{shop.address}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {shop.contactNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Province">{province}</Descriptions.Item>
        <Descriptions.Item label="Regency">{regency}</Descriptions.Item>
      </Descriptions>
    </Content>
  );
};

export default Home;
