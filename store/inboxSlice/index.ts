import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { InboxState, Conversation } from "../../ts/interfaces/inbox";

export const initialState: InboxState = {
  conversations: [] as Conversation[],
  inboxLoadingStatus: "IDLE",
  user: null
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {},
  extraReducers: {}
});


// export const {} = inboxSlice.actions;

export default inboxSlice.reducer;