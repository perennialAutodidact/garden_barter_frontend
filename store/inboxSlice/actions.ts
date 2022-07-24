import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { BASE_URL } from "../../constants";

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
    "auth/fetchConversation",
    async (conversationId:number, { rejectWithValue }) => {
      return await axios
        .get(`/api/inbox/conversations/${conversationId}`, { headers: headers })
        .then((res) => res.data)
        .catch((err) => rejectWithValue(err.response.data));
    }
  );
