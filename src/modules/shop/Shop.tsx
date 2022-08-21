import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/state/hooks";
import { ShopActions, ShopSelectors } from ".";

import ShopSkeleton from "./components/ShopSkeleton";
import ShopList from "./components/ShopList";
import EmptyShop from "./components/EmptyShop";

const Shop = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(ShopSelectors.selectRequestStatus);
  const shops = useAppSelector(ShopSelectors.selectShopRoot);

  const token = sessionStorage.getItem("pos-token");

  useEffect(() => {
    if (token) {
      dispatch(ShopActions.getOwnerShops());
      dispatch(ShopActions.getCountries());
    }
  }, [token]);

  if (isLoading) return <ShopSkeleton />;

  return (
    <div className="shop-container">
      {shops ? <ShopList shops={shops} /> : <EmptyShop />}
    </div>
  );
};

export default Shop;
