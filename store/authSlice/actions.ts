import { createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthFormData } from "../../ts/interfaces/auth";
import { AppThunk } from "../../store/store";
import Router from "next/router";

const BASE_URL: string = "http://localhost:8000";
const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000"
};
axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = BASE_URL + "/register/";
    const response = await axios
      .post(url, formData, {
        
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err));
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = BASE_URL + "/login/";
    const response = await axios
      .post(url, formData, {
        headers: headers
      })
      .then((res) => res.data)
      .catch((error) => {
        return rejectWithValue(error.msg);
      });

    return response;
  }
);
