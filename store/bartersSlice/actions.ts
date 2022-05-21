import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BarterFormData } from "../../ts/interfaces/barters";

const BASE_URL: string = "http://localhost:8000/barters";
const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000"
};
axios.defaults.withCredentials = true;

export const createBarter = createAsyncThunk(
  "barter/create",
  async (formData:BarterFormData, { rejectWithValue }) => {
    console.log("formData", formData);
    const url = BASE_URL + "/create/";
    return await axios
      .post(url, formData, {
        headers: {
            ...headers,
            'Authorization': `Token ${formData.accessToken}`
        }
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err.response);
        return rejectWithValue(err.response.data.msg);
      });
  }
);
