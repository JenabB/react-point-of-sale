import { DashboardModels } from ".";
import { createSelector } from "@reduxjs/toolkit";

export const dashboardRoot = (state: any): DashboardModels.Dashboard =>
  state.dashboard;

export const selectUserRoot = createSelector(
  dashboardRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.user;
  }
);

export const selectShop = createSelector(
  dashboardRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.shop;
  }
);

export const selectProducts = createSelector(
  dashboardRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.products;
  }
);

export const selectInvoices = createSelector(
  dashboardRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.invoices;
  }
);

export const selectInvoiceDetails = createSelector(
  dashboardRoot,
  (root: DashboardModels.Dashboard): any => {
    return root.invoiceDetails;
  }
);
