// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/apiClient";

export const userLogin = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await loginUser(credentials);
    const { role } = response.data; // Extract the role from the response
    localStorage.setItem("role", role); // Store the role in localStorage
    return { role };
  } catch (error) {
    throw new Error("Login failed");
  }
});

export const userSignUp = createAsyncThunk("auth/signUp", async (userData) => {
  try {
    const response = await registerUser(userData);
    return response.data;
  } catch (error) {
    throw new Error("Sign-up failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Login failed. Please check your credentials.";
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Sign-up failed. Please try again.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
