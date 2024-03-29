import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
  },
  reducers: {
    sowModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action.getCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(action.getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(action.getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { sowModal } = appSlice.actions;

export default appSlice.reducer;
