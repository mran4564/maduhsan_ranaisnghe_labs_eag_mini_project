// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import MainDashboard from '../components/Main.component';
import OrdersList from '../components/order/OrdersList.component';
import ProductGrid from '../components/products/ProductGrid.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<MainDashboard />}>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/:category_id" element={<ProductGrid />} />
          <Route path="/orders" element={<OrdersList />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
