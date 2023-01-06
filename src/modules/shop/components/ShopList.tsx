import React, { FC, useState } from "react";
import { ShopModels } from "modules/shop";
import { Tooltip, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ShopItem from "./ShopItem";
import ShopCreateModal from "./ShopCreateModal";

interface Props {
  shops: Array<ShopModels.Shop>;
}
const ShopList: FC<Props> = (props) => {
  const [isCreate, setIsCreate] = useState(false);

  const handleCreateClick = () => setIsCreate(true);

  const handleClose = () => setIsCreate(false);
  return (
    <div>
      <ShopCreateModal shop={null} isOpen={isCreate} onClose={handleClose} />
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
