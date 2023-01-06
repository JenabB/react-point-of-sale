import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/state/hooks";
import { ShopActions, ShopSelectors } from "modules/shop";

import ShopSkeleton from "./components/ShopSkeleton";
import ShopList from "./components/ShopList";
import EmptyShop from "./components/EmptyShop";

const Shop = () => {
  const dispatch = useAppDispatch();

  const shops = useAppSelector(ShopSelectors.selectShopRoot);

  const token = sessionStorage.getItem("pos-token");

  useEffect(() => {
    if (token) {
      dispatch(ShopActions.getOwnerShops());
      dispatch(ShopActions.getCountries());
    }
  }, [dispatch, token]);

  if (shops.isLoading) return <ShopSkeleton />;

  return (
    <div className="shop-container">
      {shops.data && shops.data.length ? (
        <ShopList shops={shops.data} />
      ) : (
        <EmptyShop />
      )}
    </div>
  );
};

export default Shop;
