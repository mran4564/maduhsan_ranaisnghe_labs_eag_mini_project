import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import { StoreProvider } from 'global-store/Module';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/b2b-app/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
