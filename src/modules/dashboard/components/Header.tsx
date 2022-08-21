import React, { FC } from "react";
import { PageHeader, Avatar, Typography, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ShopModels } from "../../shop";
import { ShopSelectors } from "../../shop";
import { useAppSelector } from "../../../common/state/hooks";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  shop: ShopModels.Shop;
}

const Header: FC<Props> = (props) => {
  const shops: Array<ShopModels.Shop> = useAppSelector(
    ShopSelectors.selectShopRoot
  );

  const navigate = useNavigate();

  const menu = (
    <Menu
      style={{ maxHeight: "400px", overflowY: "scroll" }}
      items={shops
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

  // const menu = (
  //   <Menu
  //     items={[
  //       {
  //         key: "1",
  //         label: (
  //           <div className="dropdown-menu">
  //             <Typography>Second Shop</Typography>
  //             <Avatar>S</Avatar>
  //           </div>
  //         ),
  //       },
  //       {
  //         key: "2",
  //         label: (
  //           <div className="dropdown-menu">
  //             <Typography>Third Shop</Typography>
  //             <Avatar>T</Avatar>
  //           </div>
  //         ),
  //       },
  //     ]}
  //   />
  // );

  console.log(shops);
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
