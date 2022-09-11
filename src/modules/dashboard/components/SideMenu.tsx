import {
  HomeOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuProps, Typography } from "antd";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SideMenu: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {};

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256, height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
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
        <Menu.Item>
          <Link to="settings">
            <div className="side-menu-item">
              <SettingOutlined style={{ marginRight: "10px" }} />
              <Typography>Settings</Typography>
            </div>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideMenu;
