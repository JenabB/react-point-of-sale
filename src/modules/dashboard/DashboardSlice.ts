import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { DashboardModels, DashboardReducer } from ".";

const initialState: DashboardModels.Dashboard =
  DashboardModels.getDefaultDashboard();

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
