import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { ShopModels, ShopReducer } from ".";

const initialState: ShopModels.ShopState = {
  isLoading: false,
  countries: [],
  provinces: [],
  regencies: [],
  shops: [],
};

const extraReducers = (
  builder: ActionReducerMapBuilder<ShopModels.ShopState>
) => {
  ShopReducer.cases(builder);
  ShopReducer.matchers(builder);
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers,
});

export const shopReducer = { shop: shopSlice.reducer };
