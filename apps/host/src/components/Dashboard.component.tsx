import { Grid, GridItem, Show } from '@chakra-ui/react';
import Navbar from './NavBar.component';

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
      <Show above="lg"></Show>
      <GridItem area="main"></GridItem>
    </Grid>
  );
};

export default Dashboard;
