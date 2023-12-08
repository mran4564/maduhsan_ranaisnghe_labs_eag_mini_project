import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Dashboard from '../components/Dashboard.component';

const Auth = React.lazy(() => import('auth/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/b2b-app" />} />
          <Route path="/*" element={<Auth />} />
          <Route element={<AuthGuard />}>
            <Route path="/b2b-app/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </React.Suspense>
  );
}

export default App;
