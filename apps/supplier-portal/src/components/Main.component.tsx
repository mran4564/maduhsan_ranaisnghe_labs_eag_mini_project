import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Sidebar } from './sidebar/SideBar.component';
import { Outlet } from 'react-router-dom';

const SupplyDashboard = () => {
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
        <Sidebar />
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default SupplyDashboard;
