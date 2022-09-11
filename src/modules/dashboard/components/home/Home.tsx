import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import {
  Descriptions,
  Layout,
  Button,
  Tooltip,
  Avatar,
  Card,
  Typography,
  Divider,
  Badge,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DashboardSelectors } from "../..";
import { useState } from "react";
import ShopCreateModal from "../../../shop/components/ShopCreateModal";
import { AreaActions } from "../../action";
import InvoiceInfo from "./InvoiceInfo";
import ProductInfo from "./ProductInfo";

const Home = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleOpen = (shop: any) => {
    setEditOpen(true);
  };

  const handleClose = () => setEditOpen(false);

  const { Content } = Layout;
  const { Title } = Typography;
  const { data } = useAppSelector(DashboardSelectors.selectShop);

  useEffect(() => {
    dispatch(
      AreaActions.getAreaInformation({
        countryId: data.countryId,
        provinceId: data.provinceId,
        regencyId: data.regencyId,
      })
    ).then((res: any) => {
      setCountry(res.payload.country);
      setProvince(res.payload.province);
      setRegency(res.payload.regency);
    });
  }, [data.countryId, data.provinceId, data.regencyId, dispatch]);

  return (
    <>
      <ShopCreateModal shop={data} isOpen={editOpen} onClose={handleClose} />
      <div>
        <Content className="dashboard-content-item">
          <div style={{ textAlign: "right" }}>
            <Tooltip>
              <Button
                onClick={handleOpen}
                type="primary"
                icon={<EditOutlined />}
              >
                Edit Shop
              </Button>
            </Tooltip>
          </div>
          <div>
            <Typography>{data.shopName}</Typography>
            <Typography>{data.address}</Typography>
            <Typography>{data.contactNumber}</Typography>
            <div>
              <Typography>Country: {country}</Typography>
              <Typography>Province: {province}</Typography>
              <Typography>Regency: {regency}</Typography>
            </div>
          </div>
          {/* <Descriptions title={data.shopName} layout="vertical">
          <Descriptions.Item label="Address">{data.address}</Descriptions.Item>
          <Descriptions.Item label="Contact Number">
            {data.contactNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Country">{country}</Descriptions.Item>
          <Descriptions.Item label="Province">{province}</Descriptions.Item>
          <Descriptions.Item label="Regency">{regency}</Descriptions.Item>
        </Descriptions> */}
        </Content>
        <div style={{ margin: "20px 0" }}>
          <Typography.Title
            className="home-badge"
            style={{ color: "white" }}
            level={5}
          >
            Product
          </Typography.Title>
          <Divider style={{ backgroundColor: "white", height: 2 }} />
          <ProductInfo />
        </div>
        <div style={{ margin: "20 0" }}>
          <Typography.Title
            className="home-badge"
            style={{ color: "white" }}
            level={5}
          >
            Invoice
          </Typography.Title>
          <Divider style={{ backgroundColor: "white", height: 2 }} />
          <InvoiceInfo />
        </div>
      </div>
    </>
  );
};

export default Home;
