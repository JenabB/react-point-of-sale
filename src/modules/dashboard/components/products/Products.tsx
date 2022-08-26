import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors } from "../..";
import EmptyProduct from "./EmptyProduct";
import ProductList from "./ProductList";
import { Alert } from "antd";
import { ProductActions } from "../../action";

const Products = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(DashboardSelectors.selectProducts);

  const handleClose = () => {
    setIsError(false);
    dispatch(ProductActions.clearError409());
  };

  useEffect(() => {
    if (status === 409) {
      setIsError(true);
    }
  }, [status]);

  return (
    <div>
      {isError && (
        <Alert
          style={{ marginBottom: "20px" }}
          message="Product Already Exists"
          description="Please insert another product name"
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
