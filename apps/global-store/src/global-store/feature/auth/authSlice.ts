import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

interface UserData {
  userId: string | null;
  userRole: string | null;
}

interface AuthState {
  userData: UserData | null;
  idToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userData: null,
  idToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userId, userRole, idToken, refreshToken } = action.payload;
      const userData: UserData = { userId, userRole };
      sessionStorage.setItem('userData', JSON.stringify(userData));
      sessionStorage.setItem('idToken', idToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      state.userData = userData;
      state.idToken = idToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.userData = null;
      state.idToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { userData: UserData } }) =>
  state.auth.userData;
export const selectAccessToken = (state: { auth: { idToken: string } }) =>
  state.auth.idToken;
export const selectRefreshToken = (state: { auth: { refreshToken: string } }) =>
  state.auth.refreshToken;

export function AuthSlice() {
  const userData = useSelector(
    (state: { auth: { userData: UserData } }) => state.auth.userData
  );
  const idToken = useSelector(
    (state: { auth: { idToken: string } }) => state.auth.idToken
  );
  const refreshToken = useSelector(
    (state: { auth: { refreshToken: string } }) => state.auth.refreshToken
  );
  const dispatch = useDispatch();
  return {
    userData,
    idToken,
    refreshToken,
    setCredentials: (payload: {
      userId: string;
      userRole: string;
      idToken: string;
      refreshToken: string;
    }) => dispatch(setCredentials(payload)),
  };
}
