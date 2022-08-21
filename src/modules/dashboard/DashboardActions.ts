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

export const getShopById = createAsyncThunk(
  "dashboard/getShopById",
  async (shopId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/shop/${shopId}`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "dashboard/getProducts",
  async (shopId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${HOST}/v1/shop/${shopId}/product`, config)
        .then((res) => res.data.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

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
  shopId: number | undefined;
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

interface AddProductParams {
  shopId: string | undefined;
  data: {
    productName: string;
    productPrice: number;
  };
}

export const addProduct = createAsyncThunk(
  "dashboard/addProduct",
  async (params: AddProductParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${HOST}/v1/shop/${params.shopId}/product`, params.data, config)
        .then((res) => res.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "dashboard/updateProduct",
  async (params: AddProductParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${HOST}/v1/shop/${params.shopId}/product`, params.data, config)
        .then((res) => res.data);

      console.log(response, "ress");

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface DeleteProductParams {
  shopId: string | undefined;
  productId: string | number | undefined;
}

export const deleteProduct = createAsyncThunk(
  "dashboard/deleteProduct",
  async (params: DeleteProductParams, { rejectWithValue }) => {
    try {
      await axios
        .delete(
          `${HOST}/v1/shop/${params.shopId}/product/${params.productId}`,
          config
        )
        .then((res) => res.data);

      return params.productId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

interface AddInvoiceParams {
  shopId: string;
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

interface DeleteShopParams {
  shopId: string | undefined;
}

export const deleteShop = createAsyncThunk(
  "dashboard/deleteShop",
  async (params: DeleteShopParams, { rejectWithValue }) => {
    try {
      await axios.delete(`${HOST}/v1/shop/${params.shopId}`, config);

      return params.shopId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
