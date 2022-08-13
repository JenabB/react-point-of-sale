import { DashboardModels } from ".";
import { createSelector } from "@reduxjs/toolkit";

export const authRoot = (state: any): DashboardModels.Dashboard =>
  state.dashboard;

export const selectRequestStatus = createSelector(
  authRoot,
  (root: DashboardModels.Dashboard): boolean => {
    return root.isLoading;
  }
);

export const selectUserRoot = createSelector(
  authRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.user;
  }
);
