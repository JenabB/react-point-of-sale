import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { AuthModels, AuthReducer } from ".";

const initialState: AuthModels.AuthState = {
  isLoading: false,
  register: {
    error: false,
    status: 0,
    message: "",
  },
  login: {
    error: false,
    status: 0,
    data: {
      token: "",
    },
  },
};

const extraReducers = (
  builder: ActionReducerMapBuilder<AuthModels.AuthState>
) => {
  AuthReducer.cases(builder);
  AuthReducer.matchers(builder);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers,
});

export const authReducer = { auth: authSlice.reducer };
