import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {
  MessageState,
  Message,
//   MessagePayload
} from "../../ts/interfaces/messages";

const TEST_MESSAGES = [
  {
    id: 1,
    text: "This is a success message",
    level: "success"
  },
  {
    id: 2,
    text: "This is a info message",
    level: "info"
  },
  {
    id: 3,
    text: "This is a warning message",
    level: "warning"
  },
  {
    id: 4,
    text: "This is a warning message",
    level: "danger"
  }
];

const initialState: MessageState = {
  messages: [] as Message[]
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createMessage: (state:MessageState, action:PayloadAction<Message>) => {
        state.messages = state.messages.concat(action.payload)
    },
    deleteMessage: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload.id
      );
    }
  }
});

export const { createMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;
