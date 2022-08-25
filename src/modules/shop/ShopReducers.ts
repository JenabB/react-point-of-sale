import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { ShopActions, ShopModels } from ".";
import { DashboardActions } from "../dashboard";

const cases = (builder: ActionReducerMapBuilder<ShopModels.ShopState>) => {};

const matchers = (builder: ActionReducerMapBuilder<ShopModels.ShopState>) => {
  builder
    .addMatcher(isAnyOf(ShopActions.getOwnerShops.pending), (state, action) => {
      state.shops.isLoading = true;
    })
    .addMatcher(
      isAnyOf(ShopActions.getOwnerShops.fulfilled),
      (state: any, action) => {
        state.shops.isLoading = false;
        state.shops.data = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(ShopActions.getCountries.fulfilled),
      (state, action) => {
        state.countries = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(ShopActions.getProvinces.fulfilled),
      (state, action) => {
        state.provinces = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(ShopActions.getRegencies.fulfilled),
      (state, action) => {
        state.regencies = action.payload;
      }
    )
    .addMatcher(isAnyOf(ShopActions.saveShop.fulfilled), (state, action) => {
      const shop = action.payload;
      const isExist = state.shops.data.find(
        (el: any) => el.shopId === shop.shopId
      );
      const savedShop = state.shops.data.map((el: any) => {
        if (el.shopId === shop.shopId) {
          return shop;
        }
        return el;
      });
      state.shops.data = isExist ? savedShop : [...state.shops.data, shop];
    })
    .addMatcher(
      isAnyOf(DashboardActions.deleteShop.fulfilled),
      (state: any, action) => {
        state.shops = state.shops.data.filter(
          (el: any) => el.shopId !== action.payload
        );
      }
    );
};

const ShopReducer = { cases, matchers };

export default ShopReducer;
