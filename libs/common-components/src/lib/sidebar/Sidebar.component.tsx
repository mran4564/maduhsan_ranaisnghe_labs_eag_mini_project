import { Box } from '@chakra-ui/react';
import { MenuItem, Navigation } from './Navigation.component';

/* eslint-disable-next-line */
export interface SidebarProps {
  sideBarTitle: string;
  categoryItems: MenuItem[];
  height?: string;
}

export function Sidebar(props: SidebarProps) {
  return (
    <Box mx={7} mt={10} w="150px">
      <Navigation
        height={props.height}
        title={props.sideBarTitle}
        categoryItems={props.categoryItems}
      />
    </Box>
  );
}

export default Sidebar;
