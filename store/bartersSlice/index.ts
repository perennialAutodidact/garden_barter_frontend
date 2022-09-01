import { createSlice } from "@reduxjs/toolkit";
import {
  BarterState,
  Barter,
} from "../../ts/interfaces/barters";
import { createBarter } from "./actions";

export const initialState: BarterState = {
  barters: [],
  barterLoadingStatus: "IDLE",
  page: 1
};

export const BarterSlice = createSlice({
  name: "barters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBarter.pending, (state) => {
        state.barterLoadingStatus = 'PENDING'
    })
    .addCase(createBarter.fulfilled, (state) => {
        state.barterLoadingStatus = 'IDLE'
    })
    .addCase(createBarter.rejected, (state) => {
        state.barterLoadingStatus = 'IDLE'
    })
  }
});

export default BarterSlice.reducer;
