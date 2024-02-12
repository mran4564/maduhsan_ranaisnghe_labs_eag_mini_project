import { Box, Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@b2b-app-mfe/common-components';
import { MenuItem } from '@b2b-app-mfe/common-components';
import CategorySideBar from './category/category.component';

const items: MenuItem[] = [
  {
    label: 'Home',
    path: '/b2b-app/',
  },
  {
    label: 'Orders',
    path: '/b2b-app/orders',
  },

  {
    label: 'Settings',
    path: '/b2b',
  },
];

const MainDashboard = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1200px',
      }}
    >
      <Show above="lg">
        <Box height="400px">
          <CategorySideBar />
          <Sidebar sideBarTitle="" categoryItems={items} height="150px" />
        </Box>
      </Show>
      <GridItem width={1050} area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default MainDashboard;
