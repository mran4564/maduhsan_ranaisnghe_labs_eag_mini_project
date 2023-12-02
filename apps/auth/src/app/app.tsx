import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../components/Login.component';
import { Route, Routes } from 'react-router-dom';

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
