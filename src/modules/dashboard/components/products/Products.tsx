import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from "../..";
import ProductSkeleton from "./ProductSkeleton";
import EmptyProduct from "./EmptyProduct";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import { Button, Space } from "antd";

const Products = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isLoading = useAppSelector(DashboardSelectors.selectRequestStatus);
  const products = useAppSelector(DashboardSelectors.selectProducts);

  // useEffect(() => {
  //   dispatch(DashboardActions.getProducts(id));
  // }, [id, dispatch]);

  // if (isLoading) return <ProductSkeleton />;

  return (
    <div>
      {products ? (
        <div>
          <ProductList products={products} />
        </div>
      ) : (
        <EmptyProduct />
      )}
    </div>
  );
};

export default Products;
