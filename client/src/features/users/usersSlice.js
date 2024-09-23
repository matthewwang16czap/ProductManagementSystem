import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "/api/users";

export const getUserPublic = createAsyncThunk(
  "users/getUserPublic",
  async ({ userId }) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "GET",
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

// be sure only includes properties that needs to be changed as updatedUser
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/delete`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

export const getShop = createAsyncThunk(
  "users/getShop",
  async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/shop`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

export const getCart = createAsyncThunk(
  "users/getCart",
  async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
    }
  }
);

// item at least as productId, with or without quantity
export const updateCartItem = createAsyncThunk(
  "users/updateCartItem",
  async (item) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`${API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
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
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    lastActionPayload: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPublic.pending, handlePending)
      .addCase(getUserPublic.fulfilled, handleFulfilled)
      .addCase(getUserPublic.rejected, handleRejected)
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, handleFulfilled)
      .addCase(createUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, handleFulfilled)
      .addCase(deleteUser.rejected, handleRejected)
      .addCase(getShop.pending, handlePending)
      .addCase(getShop.fulfilled, handleFulfilled)
      .addCase(getShop.rejected, handleRejected)
      .addCase(getCart.pending, handlePending)
      .addCase(getCart.fulfilled, handleFulfilled)
      .addCase(getCart.rejected, handleRejected)
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, handleFulfilled)
      .addCase(updateCartItem.rejected, handleRejected);
  },
});

export default usersSlice.reducer;