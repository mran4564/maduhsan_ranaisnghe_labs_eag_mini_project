import React, { ReactNode } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import authReducer from './feature/auth/authSlice';
import { loadingSlice } from './feature/loading/loadingSlice';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
  },
  reducers: {
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
  },
});

const { setShowCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice.reducer,
    loader: loadingSlice.reducer,
  },
  devTools: true,
});

export function CartSlice() {
  const cartStatus = useSelector(
    (state: { cart: { showCart: boolean } }) => state.cart.showCart
  );
  const dispatch = useDispatch();
  return {
    cartStatus,
    showCart: () => dispatch(setShowCart(true)),
    hideCart: () => dispatch(setShowCart(false)),
  };
}

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
