import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { BASE_URL } from "../../constants";
import {MessageFormData} from  '../../ts/interfaces/inbox'
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : process.env.BASE_URL_PRODUCTION;

const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000"
};
axios.defaults.withCredentials = true;

export const fetchConversation = createAsyncThunk(
  "inbox/fetchConversation",
  async (conversationId: string| string[], { rejectWithValue }) => {
    return await axios
      .get(`/api/inbox/conversations/${conversationId}/`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

interface FindConversationParams {
    senderId:number;
    recipientId: number;
    barterType: string;
    barterId: string;
}
export const findConversation = createAsyncThunk(
    "inbox/findConversation",
    async (params:FindConversationParams, { rejectWithValue }) => {
      return await axios
        .get(`/api/inbox/conversations/find/`, { headers, params })
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.response.data));
    }
  );

export const createMessage = createAsyncThunk(
  "inbox/createMessage",
  async (data: MessageFormData, { rejectWithValue }) => {
    return await axios
      .post(`/api/inbox/messages/create/`, data, { headers: headers })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
