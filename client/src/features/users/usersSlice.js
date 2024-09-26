import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "/api/users";

export const logout = (state) => {
  localStorage.removeItem("jwt-token");
  state.user = null;
  state.loading = false;
  state.error = null;
};

export const getUser = createAsyncThunk("users/getUser", async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
    throw err;
  }
});

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
    throw err;
  }
});

// be sure only includes properties that needs to be changed as updatedUser
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      throw err;
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_URL}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
    throw err;
  }
});

export const getShop = createAsyncThunk("users/getShop", async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_URL}/shop`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
    throw err;
  }
});

export const getCart = createAsyncThunk("users/getCart", async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(JSON.stringify(await response.json()));
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
    throw err;
  }
});

// item at least as productId, with or without quantity
export const updateCartItem = createAsyncThunk(
  "users/updateCartItem",
  async (item) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    lastActionPayload: null,
    lastActionType: null,
    loading: false,
    error: null,
    user: null,
    shop: null,
    cart: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.user = action.payload;
      })
      .addCase(getUser.rejected, handleRejected)
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
      .addCase(getShop.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.shop = action.payload;
      })
      .addCase(getShop.rejected, handleRejected)
      .addCase(getCart.pending, handlePending)
      .addCase(getCart.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, handleRejected)
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, handleFulfilled)
      .addCase(updateCartItem.rejected, handleRejected);
  },
});

export default usersSlice.reducer;
