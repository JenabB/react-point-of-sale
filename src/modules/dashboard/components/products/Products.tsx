import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from "../..";
import ProductSkeleton from "./ProductSkeleton";
import EmptyProduct from "./EmptyProduct";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import { Button, Space, Alert } from "antd";
import { ProductActions } from "../../action";

const Products = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  // const isLoading = useAppSelector(DashboardSelectors.selectRequestStatus);
  const { data, status } = useAppSelector(DashboardSelectors.selectProducts);

  // useEffect(() => {
  //   dispatch(DashboardActions.getProducts(id));
  // }, [id, dispatch]);

  // if (isLoading) return <ProductSkeleton />;

  const handleClose = () => {
    setIsError(false);
    dispatch(ProductActions.clearError409());
  };

  useEffect(() => {
    if (status === 409) {
      setIsError(true);
    }
  }, [status]);

  console.log(status, isError);

  return (
    <div>
      {isError && (
        <Alert
          message="Error Text"
          description="Error Description Error Description Error Description Error Description Error Description Error Description"
          type="error"
          closable
          onClose={handleClose}
        />
      )}

      {data ? (
        <div>
          <ProductList products={data} />
        </div>
      ) : (
        <EmptyProduct />
      )}
    </div>
  );
};

export default Products;
