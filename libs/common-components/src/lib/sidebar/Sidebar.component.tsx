import { Box } from '@chakra-ui/react';
import { Navigation } from './Navigation.component';

/* eslint-disable-next-line */
export interface SidebarProps {
  sideBarTitle: string;
}

export function Sidebar(props: SidebarProps) {
  return (
    <Box m={10} w="150px">
      <Navigation title={props.sideBarTitle} />
    </Box>
  );
}

export default Sidebar;
