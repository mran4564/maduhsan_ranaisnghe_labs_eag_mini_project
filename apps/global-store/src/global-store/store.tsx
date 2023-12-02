import React, { ReactNode } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import authReducer from './feature/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { loadingSlice } from './feature/loading/loadingSlice';

interface CounterState {
  count: number;
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    clear: (state) => {
      state.count = 0;
    },
  },
});

const { increment, clear } = counterSlice.actions;

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    counter: counterSlice.reducer,
    loader: loadingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export function useStore() {
  const count = useSelector(
    (state: { counter: CounterState }) => state.counter.count
  );
  const dispatch = useDispatch();
  return {
    count,
    increment: () => dispatch(increment()),
    clear: () => dispatch(clear()),
  };
}

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
