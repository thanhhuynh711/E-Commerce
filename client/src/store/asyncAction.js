import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";

export const getCategory = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategory();
    console.log(response);

    if (!response.success) return rejectWithValue(response);
    return response.prodCatrgories;
  }
);
