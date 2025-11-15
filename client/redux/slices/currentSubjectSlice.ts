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

export const updateCurrentSubject = createAsyncThunk<
  { updatedSubject: ISubjectComplete; notification: INotification },
  { subjectId: number; name: string; professorId: number },
  { rejectValue: { notification: INotification } }
>(
  'currentSubject/updateCurrentSubject',
  async ({ subjectId, name, professorId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.SERVER_URL}/api/subject/${subjectId}`,
        { name, professorId },
        {
          withCredentials: true,
        },
      );
      const { data } = response.data;
      return {
        updatedSubject: data,
        notification: { type: 'success', message: 'Subject updated successfully' },
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: error.response?.data.message || 'Failed to update subject',
        },
      });
    }
  },
);

export const deleteCurrentSubject = createAsyncThunk<
  { notification: INotification },
  { subjectId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/deleteCurrentSubject', async ({ subjectId }, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.SERVER_URL}/api/subject/${subjectId}`, {
      withCredentials: true,
    });
    return {
      notification: { type: 'success', message: 'Subject deleted successfully' },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to delete subject',
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
      // Fetch Current Subject
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
      })
      // Update Current Subject
      .addCase(updateCurrentSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrentSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSubject = action.payload.updatedSubject;
      })
      .addCase(updateCurrentSubject.rejected, (state) => {
        state.isLoading = false;
        state.currentSubject = null;
      })
      // Delete Current Subject
      .addCase(deleteCurrentSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCurrentSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.currentSubject = null;
      })
      .addCase(deleteCurrentSubject.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const currentSubjectReducer = currentSubjectSlice.reducer;
export const { clearCurrentSubject } = currentSubjectSlice.actions;
