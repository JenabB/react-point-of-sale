import React, { FC } from "react";
import {
  PageHeader,
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Space,
  Button,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ShopModels } from "../../shop";
import { ShopSelectors } from "../../shop";
import { useAppSelector } from "../../../common/state/hooks";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  shop: ShopModels.Shop;
}

const Header: FC<Props> = (props) => {
  const { data }: { data: Array<ShopModels.Shop> } = useAppSelector(
    ShopSelectors.selectShopRoot
  );

  const navigate = useNavigate();

  const menu = (
    <Menu
      style={{ maxHeight: "400px", overflowY: "scroll" }}
      items={data
        .filter((shop) => shop.shopId !== props.shop.shopId)
        .map((item: any) => ({
          key: item.shopId,
          label: (
            <div className="dropdown-menu">
              <Typography>{item.shopName}</Typography>
              <Avatar>{item.shopName.charAt(0).toUpperCase()}</Avatar>
            </div>
          ),
          onClick: () => navigate(`/dashboard/${item.shopId}/home`),
        }))}
    />
  );

  console.log(data);

  return (
    <div>
      <PageHeader
        style={{ backgroundColor: "white" }}
        title="Dashboard"
        extra={[
          <>
            <Dropdown overlay={menu}>
              <Space>
                <Typography>{props.shop.shopName}</Typography>
                <Avatar>{props.shop.shopName.charAt(0).toUpperCase()}</Avatar>
                <DownOutlined />
              </Space>
            </Dropdown>
            <Link to="/shop">
              <Button>Add Shop</Button>
            </Link>
          </>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;
