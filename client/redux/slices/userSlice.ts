import { IUser } from '@/types/IUser';
import { IUserSlice } from '@/types/IUserSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Initial State Values
const initialState: IUserSlice = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

// User Login
export const loginUser = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>('user/loginUser', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}/api/auth/login`, {
      username,
      password,
    });
    const user = response.data.data;
    return { user };
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue((error.response?.data as string) || 'Login failed');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // User Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }),
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
