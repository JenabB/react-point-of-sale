import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST = "https://svc-not-e.herokuapp.com";

const token = sessionStorage.getItem("pos-token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

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
    const response = await axios
      .post(`${HOST}/v1/shop/${params.shopId}/product`, params.data, config)
      .then((res) => {
        console.log(res, "res 2");
        return res.data;
      })
      .catch((err) => {
        console.log(err, "res error");
        return err.response.data;
      });

    console.log(response, "res 3");

    if (response.status === 409) {
      return rejectWithValue(response);
    }

    return response;
  }
);

interface UpdateProductParams {
  shopId: string | undefined;
  data: {
    productId: string | undefined;
    productName: string;
    productPrice: number;
  };
}

export const updateProduct = createAsyncThunk(
  "dashboard/updateProduct",
  async (params: UpdateProductParams, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(
          `${HOST}/v1/shop/${params.shopId}/product/${params.data.productId}`,
          params.data,
          config
        )
        .then((res) => res.data);

      return response;
    } catch (error) {
      rejectWithValue(error);
    }
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
