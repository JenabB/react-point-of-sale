import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { DashboardModels, DashboardReducer } from ".";

const initialState: DashboardModels.Dashboard = {
  isLoading: false,
  user: {
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    userType: "",
    createdAt: "",
  },
  shop: null,
};

const extraReducers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  DashboardReducer.cases(builder);
  DashboardReducer.matchers(builder);
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers,
});

export const dashboardReducer = { dashboard: dashboardSlice.reducer };
