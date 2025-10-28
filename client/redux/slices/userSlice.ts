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
export const userLogin = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>('user/loginUser', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/api/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    const user = response.data.data;
    return { user };
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue((error.response?.data as string) || 'Login failed');
  }
});

// User Logout
export const userLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${process.env.SERVER_URL}/api/auth/logout`, { withCredentials: true });
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue((error.response?.data as string) || 'Logout failed');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // User Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // User Logout
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
