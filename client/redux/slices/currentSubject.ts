import { ICurrentSubjectSlice } from '@/types/ICurrentSubjectSlice';
import { INotification } from '@/types/INotificationSlice';
import { ISubjectComplete } from '@/types/ISubjectComplete';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: ICurrentSubjectSlice = {
  currentSubject: null,
  isLoading: false,
};

export const fetchCurrentSubject = createAsyncThunk<
  { currentSubject: ISubjectComplete },
  { subjectId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/fetchCurrentSubject', async ({ subjectId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/subject/${subjectId}`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { currentSubject: data };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to fetch subject',
      },
    });
  }
});

const currentSubjectSlice = createSlice({
  name: 'currentSubject',
  initialState,
  reducers: {
    clearCurrentSubject: (state) => {
      state.currentSubject = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCurrentSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSubject = action.payload.currentSubject;
      })
      .addCase(fetchCurrentSubject.rejected, (state) => {
        state.isLoading = false;
        state.currentSubject = null;
      }),
});

export const currentSubjectReducer = currentSubjectSlice.reducer;
export const { clearCurrentSubject } = currentSubjectSlice.actions;
