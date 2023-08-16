import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    clearMessage: (state) => {
      state.mes = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoading = true;
    });

    builder.addCase(action.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoading = false;
      state.token = null;
      state.mes = "Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!";
    });
  },
});

export const { login, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
