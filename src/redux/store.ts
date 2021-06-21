import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import doctorReducer from './doctorSlice'

export const store = configureStore({
  reducer: {
    doctor: doctorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

