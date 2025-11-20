import { INotification } from '@/types/slices/INotificationSlice';
import { IUser } from '@/types/interfaces/IUser';
import { IUserSlice } from '@/types/slices/IUserSlice';
import { Role } from '@/types/enums/RoleEnum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { removeClass, updateClass } from './classSlice';

// Initial State Values
const initialState: IUserSlice = {
  isLoading: true, // It needs to start as true to fetch the user on startup. Fetch User thunk will turn this false
  isAuthenticated: false,
  user: null,
};

// User Register
export const userRegister = createAsyncThunk<
  { notification: INotification },
  {
    name: string;
    username: string;
    password: string;
    role: number;
    schoolYear?: string;
  },
  { rejectValue: { notification: INotification } }
>(
  'user/registerUser',
  async ({ name, username, password, role, schoolYear }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/api/user`,
        {
          name,
          username,
          password,
          role,
          ...(role === Role.Class && { class: { schoolYear } }), // Only send class info if role is Class
        },
        { withCredentials: true },
      );
      const message = response.data.data;
      return { notification: { type: 'success', message } };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: (error.response?.data.message as string) || 'Registration failed',
        },
      });
    }
  },
);

// User Login
export const userLogin = createAsyncThunk<
  { user: IUser; notification: INotification },
  { username: string; password: string },
  { rejectValue: { notification: INotification } }
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

    // Map response to IUser type
    const cleanUser: IUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      ...(user.role === Role.Admin ? { admin: user.admin } : {}),
      ...(user.role === Role.Class ? { class: user.class } : {}),
      ...(user.role === Role.Professor ? { professor: user.professor } : {}),
    } as IUser;

    return { user: cleanUser, notification: { type: 'success', message: 'Login successful' } };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: (error.response?.data.message as string) || 'Login failed',
      },
    });
  }
});

// Fetch User
export const fetchUser = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: { notification: INotification } }
>('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/user/me`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { user: data };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: (error.response?.data.message as string) || 'Failed to load user',
      },
    });
  }
});

// Update User
export const updateUser = createAsyncThunk<
  { notification: INotification; userId: number },
  {
    userId: number;
    username: string;
    name: string;
    schoolYear?: string;
    isActive?: boolean;
    password?: string;
    type: 'admin' | 'professor' | 'class';
  },
  { rejectValue: { notification: INotification } }
>(
  'user/updateUser',
  async (
    { userId, username, name, schoolYear, isActive, password, type },
    { rejectWithValue, dispatch },
  ) => {
    try {
      await axios.patch(
        `${process.env.SERVER_URL}/api/user/${userId}`,
        { name, username, password, ...(type === 'class' && { schoolYear, isActive }) },
        {
          withCredentials: true,
        },
      );

      // Change the user type list
      switch (type) {
        case 'class':
          if (!schoolYear || isActive === undefined) break; // I know these values cannot be null
          dispatch(updateClass({ userId, name, username, schoolYear, isActive }));
          break;
      }

      const formattedType = type[0].toUpperCase().concat(type.slice(1));
      return {
        notification: { type: 'success', message: `${formattedType} updated successfully.` },
        userId,
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: error.response?.data.message ?? `Failed to delete ${type}`,
        },
      });
    }
  },
);
// Delete User
export const deleteUser = createAsyncThunk<
  { notification: INotification; userId: number },
  { userId: number; type: 'admin' | 'professor' | 'class' },
  { rejectValue: { notification: INotification } }
>('user/deleteUser', async ({ userId, type }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(`${process.env.SERVER_URL}/api/user/${userId}`, {
      withCredentials: true,
    });

    const { data } = response.data;

    // Change the user type list
    switch (type) {
      case 'class':
        dispatch(removeClass({ userId }));
    }

    return { notification: { type: 'success', message: data }, userId };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message ?? `Failed to delete ${type}`,
      },
    });
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
      // User Register
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
      })
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
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
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
