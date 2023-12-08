import React from 'react';
import { Box } from '@chakra-ui/react';
import { Navigation } from './Navigation.component';

export const Sidebar = () => (
  <Box m={10} w="150px">
    <Navigation title="Welcome" />
  </Box>
);
