import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';
import { currentClassReducer } from './slices/currentClassSlice';
import { currentSubjectReducer } from './slices/subjectSlice';
import { professorReducer } from './slices/professorSlice';
import { studentReducer } from './slices/studentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer,
    currentClass: currentClassReducer,
    subject: currentSubjectReducer,
    professorSlice: professorReducer,
    student: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
