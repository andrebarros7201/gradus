import { IEvaluation } from '@/types/interfaces/IEvaluation';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { IEvaluationSlice } from '@/types/slices/IEvaluationSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: IEvaluationSlice = {
  evaluationList: [],
};

// Add Evaluation
export const createEvaluation = createAsyncThunk<
  { notification: INotification; evaluation: IEvaluation },
  { subjectId: number; name: string; type: number; date: string },
  { rejectValue: { notification: INotification } }
>('evaluation/createEvaluation', async ({ subjectId, date, name, type }, { rejectWithValue }) => {
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
});

// Update Evaluation
export const updateEvaluation = createAsyncThunk<
  { notification: INotification; evaluation: IEvaluation },
  { name: string; type: number; date: string; evaluationId: number; subjectId: number },
  { rejectValue: { notification: INotification } }
>(
  'evaluation/updateEvaluation',
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
>('evaluation/deleteEvaluation', async ({ evaluationId }, { rejectWithValue }) => {
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
>('subject/createGrade', async ({ evaluationId, value, studentId }, { rejectWithValue }) => {
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
>('subject/updateGrade', async ({ value, gradeId }, { rejectWithValue }) => {
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
>('subject/deleteGrade', async ({ gradeId, evaluationId }, { rejectWithValue }) => {
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
const evaluationSlice = createSlice({
  name: 'evaluationSlice',
  initialState,
  reducers: {
    setEvaluations: (state, action: PayloadAction<{ evaluations: IEvaluation[] }>) => {
      state.evaluationList = action.payload.evaluations;
    },
  },
  extraReducers: (builder) =>
    builder
      // Add Evaluation
      .addCase(createEvaluation.fulfilled, (state, action) => {
        state.evaluationList.push(action.payload.evaluation);
      })
      // .addCase(createEvaluation.rejected, (state) => {})
      // Update Evaluation
      .addCase(updateEvaluation.fulfilled, (state, action) => {
        const { evaluation } = action.payload;
        const evaluationIndex = state.evaluationList.findIndex((e) => e.id === evaluation.id);
        state.evaluationList[evaluationIndex!] = evaluation;
      })
      // .addCase(updateEvaluation.rejected, (state) => {})
      // Delete Evaluation
      .addCase(deleteEvaluation.fulfilled, (state, action) => {
        const evaluationIndex = state.evaluationList.findIndex(
          (e) => e.id === action.payload.evaluationId,
        );
        state.evaluationList.splice(evaluationIndex, 1);
      })
      // .addCase(deleteEvaluation.rejected, (state) => {}),

      // Create Grade
      .addCase(createGrade.pending, (state) => {})
      .addCase(createGrade.fulfilled, (state, action) => {
        const { grade } = action.payload;
        const evaluationIndex = state.evaluationList.findIndex((e) => e.id === grade.evaluationId);
        state.evaluationList[evaluationIndex!].grades.push(grade);
      })
      .addCase(createGrade.rejected, (state) => {})
      // Update Grade
      .addCase(updateGrade.pending, (state) => {})
      .addCase(updateGrade.fulfilled, (state, action) => {
        const { grade } = action.payload;

        // Find Evaluation Index
        const evaluationIndex = state.evaluationList.findIndex((e) => e.id === grade.evaluationId);

        // Find Grade Index
        const gradeIndex = state.evaluationList[evaluationIndex!].grades.findIndex(
          (g) => g.id === grade.id,
        );

        // Replace
        state.evaluationList[evaluationIndex!].grades[gradeIndex!] = grade;
      })
      .addCase(updateGrade.rejected, (state) => {})
      // Delete Grade
      .addCase(deleteGrade.pending, (state) => {})
      .addCase(deleteGrade.fulfilled, (state, action) => {
        const { gradeId, evaluationId } = action.payload;

        // Find Evaluation Index
        const evaluationIndex = state.evaluationList.findIndex((e) => e.id === evaluationId);

        // Find Grade Index
        const gradeIndex = state.evaluationList[evaluationIndex!].grades.findIndex(
          (g) => g.id === gradeId,
        );

        // Remove
        state.evaluationList[evaluationIndex!].grades.splice(gradeIndex!, 1);
      })
      .addCase(deleteGrade.rejected, (state) => {}),
});

export const evaluationReducer = evaluationSlice.reducer;
export const { setEvaluations } = evaluationSlice.actions;
