import { Grid, GridItem } from '@chakra-ui/react';
import Navbar from './NavBar.component';
import React from 'react';

const SupplierPortal = React.lazy(() => import('supplier-portal/Module'));

const Dashboard = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <SupplierPortal />
    </Grid>
  );
};

export default Dashboard;
