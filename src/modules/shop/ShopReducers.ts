import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { ShopActions, ShopModels } from ".";

const cases = (builder: ActionReducerMapBuilder<ShopModels.ShopState>) => {};

const matchers = (builder: ActionReducerMapBuilder<ShopModels.ShopState>) => {
  builder
    .addMatcher(
      isAnyOf(
        ShopActions.getOwnerShops.pending,
        ShopActions.getCountries.pending,
        ShopActions.getProvinces.pending,
        ShopActions.getRegencies.pending
      ),
      (state, action) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(ShopActions.getOwnerShops.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.shops = action.payload;
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
    );
};

const ShopReducer = { cases, matchers };

export default ShopReducer;
