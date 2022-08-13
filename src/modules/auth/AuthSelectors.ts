import { AuthModels } from ".";
import { createSelector } from "@reduxjs/toolkit";
export const authRoot = (state: any): AuthModels.AuthState => state.auth;

export const selectRequestStatus = createSelector(
  authRoot,
  (root: AuthModels.AuthState): boolean => {
    return root.isLoading;
  }
);

export const selectRegisterRoot = createSelector(
  authRoot,
  (root: AuthModels.AuthState): any => {
    return root.register;
  }
);

export const selectLoginRoot = createSelector(
  authRoot,
  (root: AuthModels.AuthState): any => {
    return root.login;
  }
);
