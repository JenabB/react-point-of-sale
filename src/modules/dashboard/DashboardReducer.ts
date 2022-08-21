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
        DashboardActions.getShopById.pending,
        DashboardActions.getProducts.pending,
        DashboardActions.getInvoices.pending
        // DashboardActions.getInvoiceById.pending
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
    )
    .addMatcher(
      isAnyOf(DashboardActions.getProducts.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.products = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.getInvoices.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.invoices = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.getInvoiceById.fulfilled),
      (state: any, action) => {
        // state.isLoading = false;
        state.invoiceDetails = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.deleteProduct.fulfilled),
      (state: any, action) => {
        // state.isLoading = false;
        state.products = state.products.filter(
          (el: any) => el.productId !== action.payload
        );
      }
    );
};

const DashboardReducer = { cases, matchers };

export default DashboardReducer;
