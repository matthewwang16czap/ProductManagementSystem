import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "/api/products";

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async ({ productId }) => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ page, limit }) => {
    try {
      const response = await fetch(`${API_URL}?limit=${limit}&page=${page}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      // get jwttoken
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

// be sure only includes properties that needs to be changed as updatedProduct, with productId
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/${updatedProduct.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

// Helper function to handle status
const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.lastActionPayload = action.payload;
  state.lastActionType = action.type;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.lastActionPayload = null;
  state.lastActionType = action.type;
  state.error = action.error.message;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    lastActionPayload: null,
    lastActionType: null,
    loading: false,
    error: null,
    product: null,
    products: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, handlePending)
      .addCase(getProduct.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, handleRejected)
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, handleRejected)
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, handleFulfilled)
      .addCase(createProduct.rejected, handleRejected)
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, handleFulfilled)
      .addCase(updateProduct.rejected, handleRejected)
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, handleFulfilled)
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export default productsSlice.reducer;
