import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { count } from "console";

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
        .get(`${HOST}/province?countryId=${countryId}`)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getRegencies = createAsyncThunk(
  "shop/getCountries",
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
