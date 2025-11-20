import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';
import { currentClassReducer } from './slices/currentClassSlice';
import { subjectReducer } from './slices/subjectSlice';
import { professorReducer } from './slices/professorSlice';
import { studentReducer } from './slices/studentSlice';
import { evaluationReducer } from './slices/evaluationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer,
    currentClass: currentClassReducer,
    subject: subjectReducer,
    professorSlice: professorReducer,
    student: studentReducer,
    evaluation: evaluationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
