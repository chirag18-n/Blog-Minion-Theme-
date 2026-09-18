import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Register User
export const RegisterUser = createAsyncThunk(
  "REGISTER_USER",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

// Login User
export const LoginUser = createAsyncThunk(
  "LOGIN_USER",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  },
);

// LogoutUser
export const LogOutUser = createAsyncThunk("LOGOUT_USER", async () => {
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false;
        state.message = "";
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(LoginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false;
        state.message = "";
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(LogOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.user = null;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
