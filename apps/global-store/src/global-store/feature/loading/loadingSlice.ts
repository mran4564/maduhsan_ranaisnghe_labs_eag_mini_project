import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: 'loader',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      console.log(`laoding ${action.payload}`);
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export function LoadingSlice() {
  const loadingState = useSelector(
    (state: { loader: LoadingState }) => state.loader.loading
  );
  const dispatch = useDispatch();
  return {
    loadingState,
    setLoading: (payload: boolean) => dispatch(setLoading(payload)),
  };
}
