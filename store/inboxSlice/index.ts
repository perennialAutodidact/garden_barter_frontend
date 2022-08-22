import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { InboxState, Conversation } from "../../ts/interfaces/inbox";
import { createMessage, findConversation } from "./actions";

export const initialState: InboxState = {
    conversations: [] as Conversation[],
    inboxLoadingStatus: "IDLE",
    user: null,
    activeConversation: null
};

const inboxSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.inboxLoadingStatus = 'PENDING'
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.inboxLoadingStatus = 'IDLE'
            })
            .addCase(createMessage.rejected, (state) => {
                state.inboxLoadingStatus = 'IDLE'
            })

            // FIND CONVERSATION
            .addCase(findConversation.pending, (state) => {
                state.inboxLoadingStatus = 'PENDING'
                state.activeConversation = null
            })
            .addCase(findConversation.fulfilled, (state, action) => {
                state.inboxLoadingStatus = 'IDLE'
                state.activeConversation = action.payload.conversation
            })
            .addCase(findConversation.rejected, (state) => {
                state.inboxLoadingStatus = 'IDLE'
                state.activeConversation = null
            })
    }
});


// export const {} = inboxSlice.actions;

export default inboxSlice.reducer;