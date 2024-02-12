import { setNavigate } from '@b2b-app-mfe/services';
import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Dashboard from '../components/Main.component';

const Auth = React.lazy(() => import('auth/Module'));

export function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <React.Suspense fallback={null}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/b2b-app" />} />
          <Route path="/*" element={<Auth />} />
          <Route
            path="/b2b-app/*"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </ChakraProvider>
    </React.Suspense>
  );
}

export default App;
