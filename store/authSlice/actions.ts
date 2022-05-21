import { createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthFormData, User } from "../../ts/interfaces/auth";
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
    return await axios
      .post(url, formData, {
        headers: headers
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log("err", err.response);
        return rejectWithValue(err.response.data.msg);
      });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = BASE_URL + "/login/";
    return await axios
      .post(url, formData, {
        headers: headers
      })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data.msg));
  }
);

export const requestToken = createAsyncThunk(
  "auth/requestToken",
  async ({}, { rejectWithValue }) => {
    const url = BASE_URL + "/token/";
    return await axios
      .get(url, {
        headers: headers
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data.msg));
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user: User, { rejectWithValue }) => {
    const url = BASE_URL + "/logout/";
    return await axios.post(
      url,
      {
          user
      },
      {
        headers: headers
      }
    );
  }
);
