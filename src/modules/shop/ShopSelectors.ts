import { ShopModels } from ".";
import { createSelector } from "@reduxjs/toolkit";

export const shopRoot = (state: any): ShopModels.ShopState => state.shop;

export const selectRequestStatus = createSelector(
  shopRoot,
  (root: ShopModels.ShopState): any => {
    return root.isLoading;
  }
);

export const selectShopRoot = createSelector(
  shopRoot,
  (root: ShopModels.ShopState): any => {
    return root.shops;
  }
);

export const selectCountries = createSelector(
  shopRoot,
  (root: ShopModels.ShopState): any => {
    return root.countries;
  }
);

export const selectProvinces = createSelector(
  shopRoot,
  (root: ShopModels.ShopState): any => {
    return root.provinces;
  }
);

export const selectRegencies = createSelector(
  shopRoot,
  (root: ShopModels.ShopState): any => {
    return root.regencies;
  }
);
