import React, { FC } from "react";
import { ShopModels } from "../";
import ShopItem from "./ShopItem";

interface Props {
  shops: Array<ShopModels.Shop>;
}
const ShopList: FC<Props> = (props) => {
  return (
    <div className="shop-list">
      {props.shops.map((shop, index) => (
        <ShopItem shop={shop} key={index} />
      ))}
    </div>
  );
};

export default ShopList;
