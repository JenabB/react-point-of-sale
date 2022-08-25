import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { DashboardActions, DashboardModels } from ".";
import { ProductActions } from "./action";
import { ShopActions } from "../shop";

const cases = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {};

const matchers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  builder
    // .addMatcher(
    //   isAnyOf(
    //     DashboardActions.getUser.pending,
    //     DashboardActions.getShopById.pending,
    //     ProductActions.getProducts.pending,
    //     DashboardActions.getInvoices.pending
    //     // DashboardActions.getInvoiceById.pending
    //   ),
    //   (state, action) => {
    //     state.isLoading = true;
    //   }
    // )
    .addMatcher(
      isAnyOf(DashboardActions.getUser.fulfilled),
      (state: any, action) => {
        state.user = action.payload;
      }
    )

    .addMatcher(
      isAnyOf(DashboardActions.getShopById.pending),
      (state: any, action) => {
        state.shop.isLoading = true;
      }
    )

    .addMatcher(
      isAnyOf(DashboardActions.getShopById.fulfilled),
      (state: any, action) => {
        state.shop.isLoading = false;
        state.shop.data = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(ProductActions.getProducts.fulfilled),
      (state: any, action) => {
        // state.isLoading = false;
        state.products.data = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(DashboardActions.getInvoices.fulfilled),
      (state: any, action) => {
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
      isAnyOf(ProductActions.saveProduct.rejected),
      (state: any, action) => {
        // state.isLoading = false;
        state.products = {
          data: state.products.data,
          ...(action.payload as {}),
        };
      }
    )
    .addMatcher(isAnyOf(ShopActions.saveShop.fulfilled), (state, action) => {
      // state.isLoading = false;
      state.shop = action.payload;
    })
    .addMatcher(
      isAnyOf(ProductActions.deleteProduct.fulfilled),
      (state: any, action) => {
        // state.isLoading = false;
        state.products.data = state.products.data.filter(
          (el: any) => el.productId !== action.payload
        );
      }
    );
};

const DashboardReducer = { cases, matchers };

export default DashboardReducer;
