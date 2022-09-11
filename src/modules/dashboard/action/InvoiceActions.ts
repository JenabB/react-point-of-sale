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

export const getInvoices = createAsyncThunk(
  "dashboard/getInvoices",
  async (shopId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/shop/${shopId}/invoice`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface GetInvoiceParams {
  shopId: number | string | undefined;
  invoiceId: number | undefined;
}

export const getInvoiceById = createAsyncThunk(
  "dashboard/getInvoiceById",
  async (params: GetInvoiceParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(
          `${HOST}/v1/shop/${params.shopId}/invoice/${params.invoiceId}`,
          config
        )
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface AddInvoiceParams {
  shopId: string | number | undefined;
  data: {
    invoiceCode: string;
    productInsertMode: string;
    customerName: string;
    products: Array<any>;
  };
}

export const addInvoice = createAsyncThunk(
  "dashboard/addInvoice",
  async (params: AddInvoiceParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${HOST}/v1/shop/${params.shopId}/invoice`, params.data, config)
        .then((res) => res.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
