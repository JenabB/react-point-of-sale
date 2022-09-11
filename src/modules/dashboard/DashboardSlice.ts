import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { DashboardModels, DashboardReducer } from ".";
import { UserReducer } from "./reducer";

const initialState: DashboardModels.Dashboard =
  DashboardModels.getDefaultDashboard();

const extraReducers = (
  builder: ActionReducerMapBuilder<DashboardModels.Dashboard>
) => {
  DashboardReducer.cases(builder);
  UserReducer.cases(builder);

  DashboardReducer.matchers(builder);
  UserReducer.matchers(builder);
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers,
});

export const dashboardReducer = { dashboard: dashboardSlice.reducer };
