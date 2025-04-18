import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 10, skip = 0, category = "", search = "", sortBy = "" }) => {
    let url = "https://dummyjson.com/products";
    if (search) {
      url += `/search?q=${search}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== "all") {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url += `?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (sortBy) {
      data.products.sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
    }

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
