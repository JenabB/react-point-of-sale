import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

export const getUser = createAsyncThunk(
  "dashboard/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios
        .get(`${HOST}/v1/user/profile`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getShopById = createAsyncThunk(
  "dashboard/getShopById",
  async (shopId: string | undefined, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios
        .get(`${HOST}/v1/shop/${shopId}`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface DeleteShopParams {
  shopId: string | undefined;
}

export const deleteShop = createAsyncThunk(
  "dashboard/deleteShop",
  async (params: DeleteShopParams, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`${HOST}/v1/shop/${params.shopId}`, config);

      return params.shopId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
