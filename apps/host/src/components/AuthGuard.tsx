import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { AuthSlice } from 'global-store/Module';
import { LoadingSlice } from 'global-store/Module';
import Loading from './Loading.component';

const AuthGuard = () => {
  const userData = sessionStorage.getItem('userData');
  const idToken = sessionStorage.getItem('idToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  const navigate = useNavigate();
  const { setCredentials } = AuthSlice();
  const { setLoading, loadingState } = LoadingSlice();
  useEffect(() => {
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadToken = () => {
    setLoading(true);
    if (idToken && refreshToken && userData) {
      const { userId, userRole } = JSON.parse(userData);
      setCredentials({
        userId,
        userRole,
        idToken: idToken || '',
        refreshToken: refreshToken || '',
      });
      console.log(loadingState);
      setLoading(false);
      navigate('/dashboard');
    } else {
      console.log(loadingState);
      navigate('/login');
    }
  };

  return loadingState ? <Loading /> : <Outlet />;
};

export default AuthGuard;
