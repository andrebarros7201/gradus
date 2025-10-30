import { IClassSimple } from '@/types/IClass';
import { IClassSlice } from '@/types/IClassSlice';
import { INotification } from '@/types/INotificationSlice';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: IClassSlice = {
  isLoading: false,
  classes: [],
};

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
  } catch (e) {
    return rejectWithValue({ notification: { type: 'error', message: 'Failed to load classes' } });
  }
});

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.isLoading = true;
        state.classes = action.payload.classes;
      })
      .addCase(fetchAllClasses.rejected, (state) => {
        state.isLoading= false
        state.classes = []
      }),
});

export const classReducer = classSlice.reducer;
