import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthFormData, User } from "../../ts/interfaces/auth";

const headers = {
  accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000"
};
axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = "api/auth/register/";
    return await axios
      .post(url, formData, {
        headers: headers
      })
      .then((res) => res.data)
      .catch((err) => {
        // console.log("err", err.response);
        return rejectWithValue(err.response.data);
      });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: AuthFormData, { rejectWithValue }) => {
    const url = "api/auth/login/";
    return await axios
      .post(url, formData, { headers: headers })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({}, { rejectWithValue }) => {
    return await axios
      .get("/api/auth/fetchUser", {
        headers: headers
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (tokenType: "access" | "refresh", { rejectWithValue }) => {
    return await axios
      .post(`/api/auth/verify/`, { tokenType }, { headers: headers })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async ({}, { rejectWithValue }) => {
    return await axios
      .post(
        `/api/auth/refresh/`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({}, { rejectWithValue }) => {
    const url = "api/auth/logout/";
    return await axios
      .post(
        url,
        {},
        {
          headers: headers
        }
      )
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
