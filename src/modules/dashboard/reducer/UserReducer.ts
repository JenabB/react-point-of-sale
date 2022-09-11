import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { DashboardActions, DashboardModels } from "..";
import { UserActions } from "../action";

const cases = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {};

const matchers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  builder
    .addMatcher(
      isAnyOf(UserActions.getUserProfile.pending),
      (state: any, action) => {
        state.user.isLoading = true;
      }
    )

    .addMatcher(
      isAnyOf(UserActions.getUserProfile.fulfilled),
      (state: any, action) => {
        state.user.isLoading = false;
        state.user.data = action.payload;
      }
    );
};

const UserReducer = { cases, matchers };

export default UserReducer;
