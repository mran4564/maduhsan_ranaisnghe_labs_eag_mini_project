import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/login.component';
import SignUp from '../components/signup.component';
import VerificationMessage from '../components/verification.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verify" element={<VerificationMessage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
