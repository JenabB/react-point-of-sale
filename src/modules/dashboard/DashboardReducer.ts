import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { DashboardActions, DashboardModels } from ".";

const cases = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {};

const matchers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  builder
    .addMatcher(
      isAnyOf(
        DashboardActions.getUser.pending,
        DashboardActions.getShopById.pending
      ),
      (state, action) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.getUser.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.user = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.getShopById.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.shop = action.payload;
      }
    );
};

const DashboardReducer = { cases, matchers };

export default DashboardReducer;
