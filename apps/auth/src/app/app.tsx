import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../redux/features/auth/login';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../redux/features/auth/requireAuth';
import Welcome from '../redux/features/auth/welcome';
import Layout from '../components/layout.component';
import { setCredentials } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    const idToken = sessionStorage.getItem('idToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (userData !== undefined && userData !== null) {
      const { userId, userRole } = JSON.parse(userData);
      dispatch(setCredentials({ userId, userRole, idToken, refreshToken }));
    }
  }, [dispatch]);

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
