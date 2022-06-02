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

export const initialState: BarterState = {
  barters: [],
  barterLoadingStatus: "IDLE",
  page: 1
};

export const BarterSlice = createSlice({
  name: "barters",
  initialState,
  reducers: {},
  extraReducers: {}
});

export default BarterSlice.reducer;
