import React from "react";
import { useAppSelector } from "../../../../common/state/hooks";
import { Typography, Card, Descriptions, Layout, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DashboardSelectors } from "../..";
import { useState } from "react";
import ShopCreateModal from "../../../shop/components/ShopCreateModal";

const Home = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const [selectedShop, setSelectedShop] = useState(null);

  const handleOpen = (shop: any) => {
    setSelectedShop(shop);
    setEditOpen(true);
  };

  const handleClose = () => setEditOpen(false);

  const { Content } = Layout;
  const shop = useAppSelector(DashboardSelectors.selectShop);
  return (
    <>
      <ShopCreateModal shop={shop} isOpen={editOpen} onClose={handleClose} />
      <Content className="dashboard-content-item">
        <div style={{ textAlign: "right" }}>
          <Tooltip>
            <Button onClick={handleOpen} type="primary" icon={<EditOutlined />}>
              Edit Shop
            </Button>
          </Tooltip>
        </div>
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
    </>
  );
};

export default Home;
