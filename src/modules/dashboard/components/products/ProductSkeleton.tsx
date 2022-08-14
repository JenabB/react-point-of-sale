import { Skeleton } from "antd";
import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="shop-skeleton">
      {Array.from(Array(4).keys()).map((el, index) => (
        <Skeleton style={{ width: "20%", margin: "10px" }} key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
