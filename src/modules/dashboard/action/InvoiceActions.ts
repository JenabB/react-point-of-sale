import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

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
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios
        .get(`${HOST}/v1/shop/${shopId}/invoice`, config)
        .then((res) => res.data.data);

      let i = 0;
      let invoiceArray: Array<any> = [];
      for (i; i < response.length; i++) {
        const productRes = await axios
          .get(
            `${HOST}/v1/shop/${shopId}/invoice/${response[i].invoiceId}`,
            config
          )
          .then((res) => res.data.data);

        invoiceArray.push(productRes);
      }

      const testt = response.map((item: any, i: any) => {
        const data = { ...item, products: invoiceArray[i].products };
        return data;
      });

      console.log(
        { invoices: response, invoiceDetails: invoiceArray, testt },
        "reso"
      );

      return invoiceArray;
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
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
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
      const token = sessionStorage.getItem("pos-token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios
        .post(`${HOST}/v1/shop/${params.shopId}/invoice`, params.data, config)
        .then((res) => res.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
