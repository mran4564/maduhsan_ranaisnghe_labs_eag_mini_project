import { Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@b2b-app-mfe/common-components';

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
        <Sidebar sideBarTitle="Welcome" />
      </Show>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default StewardDashboard;
