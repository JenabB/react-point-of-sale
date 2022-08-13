import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

interface RegisterProps {
  fullName: string;
  contactNumber: string;
  email: string;
  password: string;
}
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (params: RegisterProps, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${HOST}/v1/user/register/owner`, params)
        .then((res) => res.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (params: LoginParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${HOST}/v1/user/login/owner`, params)
        .then((res) => {
          sessionStorage.setItem("pos-token", res.data.data.token)
          return res.data;
        });

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const clearRegister = createAction("auth/clearRegister", () => ({
  payload: {
    error: false,
    status: 0,
    message: "",
  },
}));
