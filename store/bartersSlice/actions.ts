import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../ts/interfaces/auth";
import { BarterFormData } from "../../ts/interfaces/barters";
// import { BASE_URL } from "../../constants";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:8000'
    : process.env.BASE_URL_PRODUCTION;



const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000"
};
axios.defaults.withCredentials = true;

export const createBarter = createAsyncThunk(
  "barter/create",
  async (data:{formData:BarterFormData, user:User}, { rejectWithValue }) => {
    console.log("formData", data);
    return await axios
      .post("/api/barters/create/", data, {
        headers: {
          ...headers,
        }
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
