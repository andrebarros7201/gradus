import { IEvaluationSlice } from '@/types/slices/IEvaluationSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IEvaluationSlice = {
  evaluations: [],
};

const evaluationSlice = createSlice({
  name: 'evaluationSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export const evaluationReducer = evaluationSlice.reducer;
export const {} = evaluationSlice.actions;
