import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { Layout, Button, Tooltip, Typography, Divider, Space } from "antd";
import {
  EditOutlined,
  GlobalOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { DashboardSelectors } from "../..";
import ShopCreateModal from "../../../shop/components/ShopCreateModal";
import { AreaActions } from "../../action";
import InvoiceInfo from "./InvoiceInfo";
import ProductInfo from "./ProductInfo";

const Home = () => {
  //state
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { Content } = Layout;
  const { data } = useAppSelector(DashboardSelectors.selectShop);

  //action
  const handleOpen = (shop: any) => {
    setEditOpen(true);
  };
  const handleClose = () => setEditOpen(false);

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
            <Typography.Title level={3}>{data.shopName}</Typography.Title>
            <div>
              <Space>
                <HomeOutlined />
                <Typography>{data.address}</Typography>
              </Space>
            </div>
            <div>
              <Space>
                <PhoneOutlined />
                <Typography>{data.contactNumber}</Typography>
              </Space>
            </div>
            <div>
              <Space>
                <GlobalOutlined />
                <Typography>{regency}, </Typography>
                <Typography>{province},</Typography>
                <Typography> {country}</Typography>
              </Space>
            </div>
          </div>
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
