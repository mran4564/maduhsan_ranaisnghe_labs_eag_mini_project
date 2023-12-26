import { AuthDetails, UserData } from '../types/auth.type';

export const loadSession = () => {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    const { userId, userRole } = JSON.parse(userData);
    return { userId, userRole };
  } else {
    return {};
  }
};

export const setSessionDataLogin = (data: AuthDetails) => {
  const { userId, userRole, idToken, refreshToken, email } = data;
  const userData: UserData = { userId, userRole, email };
  sessionStorage.setItem('userData', JSON.stringify(userData));
  sessionStorage.setItem('idToken', idToken);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('refreshToken', refreshToken);
};

export const setRefreshData = (refreshToken: string, idToken: string) => {
  sessionStorage.setItem('idToken', idToken);
  sessionStorage.setItem('refreshToken', refreshToken);
};

export const loadToken = () => {
  const idToken = sessionStorage.getItem('idToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  const email = sessionStorage.getItem('email') ?? '';
  if (idToken && refreshToken) {
    return { idToken, refreshToken, email };
  } else {
    return {};
  }
};
