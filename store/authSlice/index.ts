import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../ts/interfaces/auth";
import { signup, login, logout, requestToken } from "./actions";

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoadingStatus: "PENDING",
  accessToken: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(signup.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      .addCase(login.pending, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(login.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      .addCase(requestToken.pending, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(requestToken.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(requestToken.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.accessToken = null;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(logout.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
      });
  }
});

export default authSlice.reducer;
