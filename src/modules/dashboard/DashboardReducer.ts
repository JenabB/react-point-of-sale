import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { DashboardActions, DashboardModels } from ".";
import { ProductActions } from "./action";
import { ShopActions } from "../shop";

const cases = (builder: ActionReducerMapBuilder<DashboardModels.Dashboard>) => {
  builder.addCase(ProductActions.clearError409, (state: any, action) => {
    state.products.status = action.payload;
  });
};

const matchers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  builder
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
        state.invoices.data = action.payload;
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
    .addMatcher(
      isAnyOf(ProductActions.saveProduct.fulfilled),
      (state: any, action) => {
        state.products.isLoading = false;
        state.products.status = action.payload.status;
        const product = action.payload.data;
        const isExist = state.products.data.find(
          (el: any) => el.productId === product.productId
        );

        const savedProduct = state.products.data.map((el: any) => {
          if (el.productId === product.productId) {
            return product;
          }
          return el;
        });

        state.products.data = isExist
          ? savedProduct
          : [...state.products.data, product];
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
