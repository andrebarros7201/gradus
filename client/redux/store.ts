import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';
import { currentClassReducer } from './slices/currentClassSlice';
import { currentSubjectReducer } from './slices/currentSubjectSlice';
import { professorReducer } from './slices/professorSlice';
import { currentStudentReducer } from './slices/currentStudentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer,
    currentClass: currentClassReducer,
    currentSubject: currentSubjectReducer,
    professorSlice: professorReducer,
    currentStudent: currentStudentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
