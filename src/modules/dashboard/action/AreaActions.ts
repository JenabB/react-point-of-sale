import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

const token = sessionStorage.getItem("pos-token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

interface GetAreaParams {
  countryId: number;
  provinceId: number;
  regencyId: number;
}

export const getAreaInformation = createAsyncThunk(
  "dashboard/getAreaInformation",
  async (params: GetAreaParams, { rejectWithValue }) => {
    try {
      const getCountry = await axios
        .get(`${HOST}/v1/area/country/${params.countryId}`)
        .then((res) => res.data.data);

      const getProvince = await axios
        .get(`${HOST}/v1/area/province/${params.provinceId}`)
        .then((res) => res.data.data);

      const getRegency = await axios
        .get(`${HOST}/v1/area/regency/${params.regencyId}`)
        .then((res) => res.data.data);

      console.log({ getCountry, getProvince, getRegency });

      return {
        country: getCountry.niceName,
        province: getProvince.provinceName,
        regency: getRegency.regencyName,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
