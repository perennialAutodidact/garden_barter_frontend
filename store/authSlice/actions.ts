import {createAsyncThunk} from '@reduxjs/toolkit'
export const signup = createAsyncThunk("auth/signup", async (formData) => {
    return formData;
  });