import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

const API_URL = "/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ account, password }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account, password }),
      });
      if (!response.ok) {
        throw new Error(JSON.stringify(await response.json()));
      }
      return response.json();
    } catch (err) {
      console.error("Failed fetch request:", err);
      // throw error to ensure the thunk rejects
      throw err;
    }
  }
);

export const logout = createAction("auth/logout");
const logoutReducer = (state, action) => {
  localStorage.removeItem("jwtToken");
  console.log(state);
  state.lastActionPayload = "successfully logout";
  state.lastActionType = action.type;
  state.loading = false;
  state.error = null;
};

// Helper function to handle status
const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.lastActionPayload = action.payload;
  state.lastActionType = action.type;
  state.error = null;
  // set token
  localStorage.setItem("jwtToken", action.payload.token);
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.lastActionPayload = null;
  state.lastActionType = action.type;
  state.error = action.error.message;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    lastActionPayload: null,
    lastActionType: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)
      .addCase(logout, logoutReducer);
  },
});

export default authSlice.reducer;
