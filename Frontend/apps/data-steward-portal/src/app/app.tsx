import { Dashboard } from '@b2b-app-mfe/common-components';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import StewardDashboard from '../components/Main.component';
import ApprovedProducts from '../components/products/Approved-Products.component';
import PendingProducts from '../components/products/Pending-Products.component';
import Products from '../components/products/Products.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<StewardDashboard />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/pending-products" element={<PendingProducts />} />
          <Route path="/approved-products" element={<ApprovedProducts />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
