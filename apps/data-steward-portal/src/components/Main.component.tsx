import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@b2b-app-mfe/common-components';
import { MenuItem } from '@b2b-app-mfe/common-components';

const items: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/b2b-app/',
  },
  {
    label: 'Products',
    path: '/b2b-app/products',
  },
  {
    label: 'Pending Products',
    path: '/b2b-app/pending-products',
  },
  {
    label: 'Approved Products',
    path: '/b2b-app/approved-products',
  },
  {
    label: 'Mail',
    path: '/b2b-app/mail',
  },
  {
    label: 'Contacts',
    path: '/',
  },
  {
    label: 'Notifications',
    path: '/',
  },
  {
    label: 'Settings',
    path: '/',
  },
];

const StewardDashboard = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 800px',
      }}
    >
      <Show above="lg">
        <Sidebar
          sideBarTitle="Data Steward Portal"
          categoryItems={items}
          height={'400px'}
        />
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default StewardDashboard;
