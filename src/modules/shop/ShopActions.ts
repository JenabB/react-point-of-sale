import { ShopFilled } from "@ant-design/icons";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

const token = sessionStorage.getItem("pos-token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getUser = createAsyncThunk(
  "dashboard/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/user/profile`, config)
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
      const response = await axios
        .get(`${HOST}/v1/shop`, config)
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
      const response = params.shopId
        ? await axios
            .put(`${HOST}/v1/shop/${params.shopId}`, params.data, config)
            .then((res) => {
              return { shopId: params.shopId, ...params.data };
            })
        : await axios
            .post(`${HOST}/v1/shop`, params.data, config)
            .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
