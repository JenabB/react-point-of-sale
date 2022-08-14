import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuProps, Typography } from "antd";
import { Menu } from "antd";
import React from "react";
import { Link, Outlet, Router, useMatch } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "sub1", <HomeOutlined />),

  getItem("Products", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  getItem("Invoice", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const SideMenu: React.FC = () => {
  // const match = useMatch();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256, height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // items={items}
      >
        <Menu.Item>
          <Link to="home">
            <div className="side-menu-item">
              <HomeOutlined style={{ marginRight: "10px" }} />
              <Typography>Home</Typography>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="products">
            <div className="side-menu-item">
              <ShoppingCartOutlined style={{ marginRight: "10px" }} />
              <Typography>Products</Typography>
            </div>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="invoices">
            <div className="side-menu-item">
              <ProfileOutlined style={{ marginRight: "10px" }} />
              <Typography>Invoices</Typography>
            </div>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideMenu;
