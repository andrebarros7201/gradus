import { ICurrentSubjectSlice } from '@/types/ICurrentSubjectSlice';
import { IEvaluation } from '@/types/IEvaluation';
import { IGradeSimple } from '@/types/IGradeSimple';
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

// Add Evaluation
export const createEvaluation = createAsyncThunk<
  { notification: INotification; evaluation: IEvaluation },
  { subjectId: number; name: string; type: number; date: string },
  { rejectValue: { notification: INotification } }
>(
  'currentSubject/createEvaluation',
  async ({ subjectId, date, name, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/api/evaluation`,
        { name, date, evaluationType: type, subjectId },
        {
          withCredentials: true,
        },
      );
      return {
        evaluation: response.data.data,
        notification: { type: 'success', message: 'Evaluation created successfully' },
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: error.response?.data.message || 'Failed to create evaluation',
        },
      });
    }
  },
);

// Update Evaluation
export const updateEvaluation = createAsyncThunk<
  { notification: INotification; evaluation: IEvaluation },
  { name: string; type: number; date: string; evaluationId: number; subjectId: number },
  { rejectValue: { notification: INotification } }
>(
  'currentSubject/updateEvaluation',
  async ({ date, name, type, evaluationId, subjectId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.SERVER_URL}/api/evaluation/${evaluationId}`,
        { name, date, evaluationType: type, subjectId },
        {
          withCredentials: true,
        },
      );
      return {
        evaluation: response.data.data,
        notification: { type: 'success', message: 'Evaluation updated successfully' },
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: error.response?.data.message || 'Failed to update evaluation',
        },
      });
    }
  },
);

// Delete Evaluation
export const deleteEvaluation = createAsyncThunk<
  { notification: INotification; evaluationId: number },
  { evaluationId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/deleteEvaluation', async ({ evaluationId }, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.SERVER_URL}/api/evaluation/${evaluationId}`, {
      withCredentials: true,
    });
    return {
      evaluationId,
      notification: { type: 'success', message: 'Evaluation successfully deleted' },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to delete evaluation',
      },
    });
  }
});

// Create Grade
export const createGrade = createAsyncThunk<
  { notification: INotification; grade: IGradeSimple },
  { evaluationId: number; value: number; studentId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/createGrade', async ({ evaluationId, value, studentId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/api/grade/`,
      { value, evaluationId, studentId },
      {
        withCredentials: true,
      },
    );
    const { data } = response.data;
    return {
      grade: data,
      notification: { type: 'success', message: 'Grade created successfully' },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to create grade',
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
      })
      // Create Evaluation
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSubject!.evaluations.push(action.payload.evaluation);
      })
      .addCase(createEvaluation.rejected, (state) => {
        state.isLoading = false;
      })
      // Update Evaluation
      .addCase(updateEvaluation.fulfilled, (state, action) => {
        const { evaluation } = action.payload;
        state.isLoading = false;
        const evaluationIndex = state.currentSubject?.evaluations.findIndex(
          (e) => e.id === evaluation.id,
        );
        state.currentSubject!.evaluations[evaluationIndex!] = evaluation;
      })
      .addCase(updateEvaluation.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Evaluation
      .addCase(deleteEvaluation.fulfilled, (state, action) => {
        state.isLoading = false;
        const evaluationIndex = state.currentSubject!.evaluations.findIndex(
          (e) => e.id === action.payload.evaluationId,
        );
        state.currentSubject!.evaluations.splice(evaluationIndex, 1);
      })
      .addCase(deleteEvaluation.rejected, (state) => {
        state.isLoading = false;
      })
      // Create Grade
      .addCase(createGrade.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        const { grade } = action.payload;
        state.isLoading = false;
        const evaluationIndex = state.currentSubject?.evaluations.findIndex(
          (e) => e.id === grade.evaluationId,
        );
        state.currentSubject!.evaluations[evaluationIndex!].grades.push(grade);
      })
      .addCase(createGrade.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const currentSubjectReducer = currentSubjectSlice.reducer;
export const { clearCurrentSubject } = currentSubjectSlice.actions;
