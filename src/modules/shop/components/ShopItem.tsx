import React, { FC } from "react";
import { Card } from "antd";
import { ShopModels } from "../";
import { Link } from "react-router-dom";

interface Props {
  shop: ShopModels.Shop;
}

const ShopItem: FC<Props> = (props) => {
  return (
    <Link to={`/dashboard/${props.shop.shopId}/home`}>
      {" "}
      <Card
        title={props.shop.shopName}
        bordered={false}
        style={{ width: 300, height: "200px", margin: 5 }}
      >
        <p>{props.shop.address}</p>
        <p>{props.shop.contactNumber}</p>
      </Card>
    </Link>
  );
};

export default ShopItem;
