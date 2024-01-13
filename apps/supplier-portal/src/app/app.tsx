// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChakraProvider } from '@chakra-ui/react';
import SupplyDashboard from '../components/Main.component';
import { Route, Routes } from 'react-router-dom';
import ProductTable from '../components/datatable/ProductTable.component';
import ProductCreatePage from '../components/products/createProduct.component';
import { Dashboard } from '@b2b-app-mfe/common-components';
import OrderItemTable from '../components/orders/OrderItemTable.component';

export function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<SupplyDashboard />}>
          <Route element={<Dashboard />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/orders" element={<OrderItemTable />} />
          <Route path="/new-product" element={<ProductCreatePage />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
