import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "/api";

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (err) {
    console.error("Failed fetch request:", err);
  }
});

// Helper function to handle status
const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.error = null;
  // set token
  localStorage.setItem("jwtToken", action.payload.token);
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected);
  },
});

export default authSlice.reducer;
