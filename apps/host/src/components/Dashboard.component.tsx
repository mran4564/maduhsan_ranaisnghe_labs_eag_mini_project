import { Grid, GridItem } from '@chakra-ui/react';
import Navbar from './NavBar.component';
import React from 'react';
import loadSession from '../utils/sessionData';

const SupplierPortal = React.lazy(() => import('supplier-portal/Module'));
const CustomerShop = React.lazy(() => import('shop/Module'));
const DataSteward = React.lazy(() => import('data-steward-portal/Module'));

export const UserRoleEnum = {
  DATA_STEWARD: 'DATA_STEWARD',
  CUSTOMER: 'CUSTOMER',
  SUPPLIER: 'SUPPLIER',
};

const Dashboard = () => {
  const { userRole } = loadSession();

  if (userRole === UserRoleEnum.CUSTOMER) {
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
        <CustomerShop />
      </Grid>
    );
  }

  if (userRole === UserRoleEnum.SUPPLIER) {
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
  }

  if (userRole === UserRoleEnum.DATA_STEWARD) {
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
        <DataSteward />
      </Grid>
    );
  }

  return <div>something went wrong! try again</div>;
};

export default Dashboard;
