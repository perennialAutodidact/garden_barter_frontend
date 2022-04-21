import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "./types";
import axios from "axios";
import { signup } from "./actions";
export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authLoadingStatus: "PENDING" | "IDLE";
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoadingStatus: "IDLE",
  accessToken: null,
};



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.authLoadingStatus = "IDLE";
      })
      .addCase(signup.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
      });
  }
});

export default authSlice.reducer;
