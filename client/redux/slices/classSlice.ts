import { IClassSimple } from '@/types/IClassSimple';
import { IClassSlice } from '@/types/IClassSlice';
import { INotification } from '@/types/INotificationSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {
    updateClass: (
      state,
      action: PayloadAction<{
        userId: number;
        name: string;
        username: string;
        schoolYear: string;
        isActive: boolean;
      }>,
    ) => {
      const { userId, name, username, schoolYear, isActive } = action.payload;
      const indexClass = state.classes.findIndex((c) => c.userId === userId);

      // Don't change if index equals -1
      if (indexClass === -1) return;

      state.classes[indexClass].name = name;
      state.classes[indexClass].username = username;
      state.classes[indexClass].schoolYear = schoolYear;
      state.classes[indexClass].isActive = isActive;
    },
    removeClass: (state, action: PayloadAction<{ userId: number }>) => {
      const indexClass = state.classes.findIndex((c) => c.userId === action.payload.userId);

      // Don't change if index equals -1
      if (indexClass === -1) return;

      state.classes.splice(indexClass, 1);
    },
  },
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
      }),
});

export const classReducer = classSlice.reducer;
export const { updateClass, removeClass } = classSlice.actions;
