import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

const token = sessionStorage.getItem("pos-token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const clearError409 = createAction("dashboard/clearError409", () => {
  return {
    payload: {
      status: 0,
    },
  };
});

export const getUserProfile = createAsyncThunk(
  "dashboard/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .put(`${HOST}/v1/user/profile`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface ChangeUserInformationParams {
  fullName: string;
  contactNumber: string;
  address: string;
}

export const changeUserInformation = createAsyncThunk(
  "dashboard/changeUserInformation",
  async (params: ChangeUserInformationParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .put(`${HOST}/v1/user/profile`, params, config)
        .then((res) => {
          console.log(res.data, "data");
          return res.data;
        });

      const rtn = { ...response, data: params };

      return rtn;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface ChangeUserPasswordParams {
  email: string;
  password: string;
  newPassword: string;
}

export const changePassword = createAsyncThunk(
  "dashboard/changeShopPassword",
  async (params: ChangeUserPasswordParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .put(`${HOST}/v1/user/change-password/owner`, params, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
