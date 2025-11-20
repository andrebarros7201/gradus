import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { INotification } from '@/types/slices/INotificationSlice';
import { ISubjectComplete } from '@/types/interfaces/ISubjectComplete';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ICurrentSubjectSlice } from '@/types/slices/ICurrentSubjectSlice';
import { IEvaluation } from '@/types/interfaces/IEvaluation';
import { ISubjectSimple } from '@/types/interfaces/ISubjectSimple';
import { RootDispatch } from '../store';
import { addSubject } from './classSlice';
import { setEvaluations } from './evaluationSlice';

const initialState: ICurrentSubjectSlice = {
  currentSubject: null,
  subjectList: [],
  isLoading: false,
};

export const fetchCurrentSubject = createAsyncThunk<
  { currentSubject: ISubjectComplete },
  { subjectId: number },
  { rejectValue: { notification: INotification }; dispatch: RootDispatch }
>('subject/fetchCurrentSubject', async ({ subjectId }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/subject/${subjectId}`, {
      withCredentials: true,
    });
    const { data } = response.data;

    dispatch(setEvaluations({ evaluations: data.evaluations }));
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

// Create Subject
export const createSubject = createAsyncThunk<
  { subject: ISubjectSimple; notification: INotification },
  { name: string; professorId: number; classId: number },
  { rejectValue: { notification: INotification }; dispatch: RootDispatch }
>(
  'subject/createSubject',
  async ({ name, professorId, classId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/api/subject`,
        { name, professorId, classId },
        { withCredentials: true },
      );
      const { data } = response.data;

      // Add Subject in classSlice
      dispatch(
        addSubject({ newSubject: { id: data.id, name: data.name, professor: data.professor } }),
      );

      return {
        notification: { type: 'success', message: 'Subject created successfully' },
        subject: { id: data.id, name: data.name, professor: data.professor },
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return rejectWithValue({
        notification: {
          type: 'error',
          message: error.response?.data.message || 'Failed to create subject',
        },
      });
    }
  },
);

// Update Subject
export const updateSubject = createAsyncThunk<
  { updatedSubject: ISubjectComplete; notification: INotification },
  { subjectId: number; name: string; professorId: number },
  { rejectValue: { notification: INotification } }
>('subject/updateCurrentSubject', async ({ subjectId, name, professorId }, { rejectWithValue }) => {
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
});

// Delete Subject
export const deleteSubject = createAsyncThunk<
  { notification: INotification },
  { subjectId: number },
  { rejectValue: { notification: INotification } }
>('subject/deleteCurrentSubject', async ({ subjectId }, { rejectWithValue }) => {
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

// Update Grade
export const updateGrade = createAsyncThunk<
  { notification: INotification; grade: IGradeSimple },
  { value: number; gradeId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/updateGrade', async ({ value, gradeId }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${process.env.SERVER_URL}/api/grade/${gradeId}`,
      { value },
      {
        withCredentials: true,
      },
    );
    const { data } = response.data;
    return {
      grade: data,
      notification: { type: 'success', message: 'Grade Updated successfully' },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to update grade',
      },
    });
  }
});

// Delete Grade
export const deleteGrade = createAsyncThunk<
  { notification: INotification; gradeId: number; evaluationId: number },
  { gradeId: number; evaluationId: number },
  { rejectValue: { notification: INotification } }
>('currentSubject/deleteGrade', async ({ gradeId, evaluationId }, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.SERVER_URL}/api/grade/${gradeId}`, {
      withCredentials: true,
    });
    return {
      gradeId,
      evaluationId,
      notification: { type: 'success', message: 'Grade deleted successfully' },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to delete grade',
      },
    });
  }
});

const subjectSlice = createSlice({
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
      // Create Subject
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjectList.push(action.payload.subject);
      })
      .addCase(fetchCurrentSubject.rejected, (state) => {
        state.isLoading = false;
      })
      // Update Current Subject
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSubject = action.payload.updatedSubject;
      })
      .addCase(updateSubject.rejected, (state) => {
        state.isLoading = false;
        state.currentSubject = null;
      })
      // Delete Current Subject
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubject.fulfilled, (state) => {
        state.isLoading = false;
        state.currentSubject = null;
      })
      .addCase(deleteSubject.rejected, (state) => {
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
      })
      // Update Grade
      .addCase(updateGrade.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        const { grade } = action.payload;
        state.isLoading = false;

        // Find Evaluation Index
        const evaluationIndex = state.currentSubject?.evaluations.findIndex(
          (e) => e.id === grade.evaluationId,
        );

        // Find Grade Index
        const gradeIndex = state.currentSubject?.evaluations[evaluationIndex!].grades.findIndex(
          (g) => g.id === grade.id,
        );

        // Replace
        state.currentSubject!.evaluations[evaluationIndex!].grades[gradeIndex!] = grade;
      })
      .addCase(updateGrade.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Grade
      .addCase(deleteGrade.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        const { gradeId, evaluationId } = action.payload;
        state.isLoading = false;

        // Find Evaluation Index
        const evaluationIndex = state.currentSubject?.evaluations.findIndex(
          (e) => e.id === evaluationId,
        );

        // Find Grade Index
        const gradeIndex = state.currentSubject?.evaluations[evaluationIndex!].grades.findIndex(
          (g) => g.id === gradeId,
        );

        // Remove
        state.currentSubject!.evaluations[evaluationIndex!].grades.splice(gradeIndex!, 1);
      })
      .addCase(deleteGrade.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const subjectReducer = subjectSlice.reducer;
export const { clearCurrentSubject } = subjectSlice.actions;
