import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/apiClient";

// Thunks for handling async requests
export const userLogin = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await loginUser(credentials);
    // Extract the token and user data
    const { token, user } = response.data;
    // Set the token in cookies
    document.cookie = `token=${token}; path=/;`;
    localStorage.setItem("token", JSON.stringify(token));

    return { user, token };
  } catch (error) {
    // Handle error (e.g., incorrect credentials)
    throw new Error("Login failed");
  }
});

export const userSignUp = createAsyncThunk("auth/signUp", async (userData) => {
  try {
    const response = await registerUser(userData);
    // Extract user data
    return response.data;
  } catch (error) {
    // Handle error (e.g., registration failure)
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
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"; // Clear cookie
    },
  },
  extraReducers: (builder) => {
    builder
      // Login handling
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
      // Sign-up handling
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
