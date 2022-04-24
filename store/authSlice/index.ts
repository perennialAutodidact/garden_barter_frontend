import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "../store";
import { User, AuthState } from "../../ts/interfaces/auth";
import axios from "axios";
import { signup, login } from "./actions";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoadingStatus: "IDLE",
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
      });
  }
});

export default authSlice.reducer;
