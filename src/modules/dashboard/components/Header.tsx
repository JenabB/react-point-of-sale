import React, { FC } from "react";
import { PageHeader, Avatar, Typography, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ShopModels } from "../../shop";

interface Props {
  shop: ShopModels.Shop;
}
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <div className="dropdown-menu">
            <Typography>Second Shop</Typography>
            <Avatar>S</Avatar>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div className="dropdown-menu">
            <Typography>Third Shop</Typography>
            <Avatar>T</Avatar>
          </div>
        ),
      },
    ]}
  />
);

const Header: FC<Props> = (props) => {
  return (
    <div>
      <PageHeader
        style={{ backgroundColor: "white" }}
        title="Dashboard"
        extra={[
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Typography>{props.shop.shopName}</Typography>
                <Avatar>{props.shop.shopName.charAt(0).toUpperCase()}</Avatar>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Header;
