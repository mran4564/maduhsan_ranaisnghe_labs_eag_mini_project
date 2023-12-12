import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import StewardDashboard from '../components/Main.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<StewardDashboard />}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
