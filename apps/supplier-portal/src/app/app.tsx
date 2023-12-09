// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChakraProvider } from '@chakra-ui/react';
import SupplyDashboard from '../components/Dashboard.component';
import { Route, Routes } from 'react-router-dom';
import ProductTable from '../components/datatable/ProductTable.component';
import ProductCreatePage from '../components/product/createProduct.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="" element={<SupplyDashboard />}>
          <Route path="" element={<div>DashBoard</div>} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/new-product" element={<ProductCreatePage />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
