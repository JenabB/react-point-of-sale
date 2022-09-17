import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

export const getUser = createAsyncThunk(
  "dashboard/getUser",
  async (_, { rejectWithValue }) => {
    const tokenConfig = sessionStorage.getItem("pos-token");

    const configHeader = {
      headers: { Authorization: `Bearer ${tokenConfig}` },
    };
    try {
      const response = await axios
        .get(`${HOST}/v1/user/profile`, configHeader)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getOwnerShops = createAsyncThunk(
  "shop/getOwnerShops",
  async (_, { rejectWithValue }) => {
    try {
      const tokenConfig = sessionStorage.getItem("pos-token");

      const configHeader = {
        headers: { Authorization: `Bearer ${tokenConfig}` },
      };
      const response = await axios
        .get(`${HOST}/v1/shop`, configHeader)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getCountries = createAsyncThunk(
  "shop/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/area/country`)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getProvinces = createAsyncThunk(
  "shop/getProvinces",
  async (countryId: number, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/area/province?countryId=${countryId}`)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getRegencies = createAsyncThunk(
  "shop/getRegencies",
  async (provinceId: number, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/area/regency?provinceId=${provinceId}`)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface SaveShopParams {
  shopId?: string | undefined;
  data: {
    shopName: string;
    countryId: number;
    provinceId: number;
    regencyId: number;
    address: string;
    contactNumber: string;
  };
}

export const saveShop = createAsyncThunk(
  "shop/saveShop",
  async (params: SaveShopParams, { rejectWithValue }) => {
    try {
      const tokenConfig = sessionStorage.getItem("pos-token");

      const configHeader = {
        headers: { Authorization: `Bearer ${tokenConfig}` },
      };
      const response = params.shopId
        ? await axios
            .put(`${HOST}/v1/shop/${params.shopId}`, params.data, configHeader)
            .then((res) => {
              return { shopId: params.shopId, ...params.data };
            })
        : await axios
            .post(`${HOST}/v1/shop`, params.data, configHeader)
            .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
