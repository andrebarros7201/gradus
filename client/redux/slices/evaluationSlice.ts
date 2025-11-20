import { IEvaluation } from '@/types/interfaces/IEvaluation';
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
      }),
  // .addCase(deleteEvaluation.rejected, (state) => {}),
});

export const evaluationReducer = evaluationSlice.reducer;
export const { setEvaluations } = evaluationSlice.actions;
