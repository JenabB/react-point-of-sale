import React, { FC } from "react";
import { ShopModels } from "../";
import { Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ShopItem from "./ShopItem";
import ShopCreateModal from "./ShopCreateModal";
import { useState } from "react";

interface Props {
  shops: Array<ShopModels.Shop>;
}
const ShopList: FC<Props> = (props) => {
  const [isCreate, setIsCreate] = useState(false);

  const handleCreateClick = () => setIsCreate(!isCreate);
  return (
    <div>
      <ShopCreateModal isOpen={isCreate} onClose={handleCreateClick} />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Tooltip title="add">
          <Button
            onClick={handleCreateClick}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </Tooltip>
      </div>
      <div style={{ marginBottom: "20px" }} className="shop-list">
        {props.shops.map((shop, index) => (
          <ShopItem shop={shop} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShopList;
