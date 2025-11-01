import { IClassSimple } from '@/types/IClassSimple';
import { IClassSlice } from '@/types/IClassSlice';
import { INotification } from '@/types/INotificationSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { callbackify } from 'util';

const initialState: IClassSlice = {
  isLoading: false,
  classes: [],
};

// Fetch All Classes
export const fetchAllClasses = createAsyncThunk<
  { classes: IClassSimple[] },
  void,
  { rejectValue: { notification: INotification } }
>('class/fetchAllClasses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/class`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { classes: data };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return rejectWithValue({ notification: { type: 'error', message: 'Failed to load classes' } });
  }
});

// Delete Class
export const deleteClass = createAsyncThunk<
  { notification: INotification; userId: number },
  { userId: number },
  { rejectValue: { notification: INotification } }
>('class/deleteClass', async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${process.env.SERVER_URL}/api/user/${userId}`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { notification: { type: 'success', message: data }, userId };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message ?? 'Failed to delete class',
      },
    });
  }
});

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Fetch All Classes
      .addCase(fetchAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.isLoading = true;
        state.classes = action.payload.classes;
      })
      .addCase(fetchAllClasses.rejected, (state) => {
        state.isLoading = false;
        state.classes = [];
      })
      // Delete Class
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        const { userId } = action.payload;
        state.isLoading = true;
        const classIndex = state.classes.findIndex((c) => c.userId === userId);
        if (classIndex === -1) return;
        state.classes = state.classes.splice(classIndex, 1);
      })
      .addCase(deleteClass.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const classReducer = classSlice.reducer;
