import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/login.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
