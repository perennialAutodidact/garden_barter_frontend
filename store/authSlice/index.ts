import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../ts/interfaces/auth";
import { AuthState } from "../../ts/interfaces/auth";
import { signup, login, logout, verify, fetchUser, refresh } from "./actions";

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoadingStatus: "IDLE",
  signupSuccess: false,
  fetchUserSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupSuccess(state) {
      state.signupSuccess = false;
    },
    resetAuthLoadingStatus(state) {
      state.authLoadingStatus = "IDLE";
    }
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupSuccess = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(signup.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.signupSuccess = false;
        state.authLoadingStatus = "IDLE";
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      // VERIFY
      .addCase(verify.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(verify.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      // REFRESH
      .addCase(refresh.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(refresh.fulfilled, (state) => {
        state.authLoadingStatus = "IDLE";
      })
      .addCase(refresh.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
      })

      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          console.log(action);
          state.authLoadingStatus = "IDLE";
          state.user = action.payload.user;
          state.fetchUserSuccess = true;
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(logout.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
      });
  }
});

export const { resetSignupSuccess, resetAuthLoadingStatus } = authSlice.actions;
export default authSlice.reducer;
