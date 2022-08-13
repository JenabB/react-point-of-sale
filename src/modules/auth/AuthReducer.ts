import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { AuthAction, AuthModels } from ".";

const cases = (builder: ActionReducerMapBuilder<AuthModels.AuthState>) => {
  builder.addCase(AuthAction.clearRegister, (state, action) => {
    state.register = action.payload;
  });
};

const matchers = (builder: ActionReducerMapBuilder<AuthModels.AuthState>) => {
  builder
    .addMatcher(
      isAnyOf(AuthAction.registerUser.pending, AuthAction.loginUser.pending),
      (state, action) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      isAnyOf(
        AuthAction.registerUser.rejected,
        AuthAction.registerUser.fulfilled
      ),
      (state: any, action) => {
        state.isLoading = false;
        state.register = action.payload;
      }
    )
    .addMatcher(
      isAnyOf(AuthAction.loginUser.rejected, AuthAction.loginUser.fulfilled),
      (state: any, action) => {
        state.isLoading = false;
        state.login = action.payload;
      }
    );
};

const AuthReducer = { cases, matchers };

export default AuthReducer;
