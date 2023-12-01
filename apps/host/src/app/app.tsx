import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

const Auth = React.lazy(() => import('auth/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
