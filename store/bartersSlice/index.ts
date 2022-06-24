import { createSlice } from "@reduxjs/toolkit";
import {
  BarterState,
  Barter,
  SeedBarter,
  PlantBarter,
  ProduceBarter,
  MaterialBarter,
  ToolBarter
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
    builder.addCase(createBarter.pending, (state) => {});
  }
});

export default BarterSlice.reducer;
