import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ page, limit }) => {
    const { data } = await axios.get(
      `https://elgendystore-1.onrender.com/getWithPageAndLimit?page=${page}&limit=${limit}`
    );
    console.log(data);
    return data;
  }
);
let productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      console.log(state.data.pageProducts);
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.error = true;
    });
  },
});
export const productsReducer = productsSlice.reducer;
