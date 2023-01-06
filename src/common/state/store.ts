import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "modules/auth";
import { dashboardReducer } from "modules/dashboard";
import { shopReducer } from "modules/shop";

const configureAppStore = () => {
  return configureStore({
    reducer: {
      ...authReducer,
      ...shopReducer,
      ...dashboardReducer,
    },
  });
};

const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
