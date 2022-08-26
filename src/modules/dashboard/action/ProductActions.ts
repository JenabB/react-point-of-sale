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

interface SaveProductParams {
  shopId: string | undefined;
  productId?: string;
  data: {
    productName: string;
    productPrice: number;
  };
}

export const saveProduct = createAsyncThunk(
  "dashboard/saveProduct",
  async (params: SaveProductParams, { rejectWithValue }) => {
    const response = params.productId
      ? await axios
          .put(
            `${HOST}/v1/shop/${params.shopId}/product/${params.productId}`,
            params.data,
            config
          )
          .then((res) => {
            return {
              status: 200,
              data: { productId: params.productId, ...params.data },
            };
          })
          .catch((err) => {
            return err.response.data;
          })
      : await axios
          .post(`${HOST}/v1/shop/${params.shopId}/product`, params.data, config)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err.response.data;
          });

    if (response.status === 409) {
      return rejectWithValue(response);
    }

    return { status: response.status, data: response.data };
  }
);

interface DeleteProductParams {
  shopId: string | undefined;
  productId: string | undefined;
}

export const deleteProduct = createAsyncThunk(
  "dashboard/deleteProduct",
  async (params: DeleteProductParams, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${HOST}/v1/shop/${params.shopId}/product/${params.productId}`,
        config
      );

      return params.productId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
