import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';
import { currentClassReducer } from './slices/currentClassSlice';
import { currentSubjectReducer } from './slices/currentSubject';
import { professorReducer } from './slices/professorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer,
    currentClass: currentClassReducer,
    currentSubject: currentSubjectReducer,
    professorSlice : professorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
