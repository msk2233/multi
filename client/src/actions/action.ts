import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'

export const Fetch = createAsyncThunk("Fetch", async () => {
    const response = await axiosInstance.get("/fetchdetail");
    const resData = response.data;
    return resData;
  });

