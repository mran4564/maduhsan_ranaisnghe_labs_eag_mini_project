import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react';
import { NavItem } from './NavItem.component';
import { useState } from 'react';

export interface CategoryItem {
  label: string;
  path: string;
}

const items: CategoryItem[] = [
  {
    label: 'Dashboard',
    path: '/b2b-app',
  },
  {
    label: 'Products',
    path: '/b2b-app/products',
  },
  {
    label: 'Mail',
    path: '/',
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
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Products',
    path: '/',
  },
  {
    label: 'Mail',
    path: '/',
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
  {
    label: 'Dashboard',
    path: '/',
  },
];

type NavaigationProps = {
  title: string;
};

export const Navigation = ({ title = 'Welcome' }: NavaigationProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <Box>
      <Text fontSize={16} fontWeight={'bold'} color="gray.700">
        {title}
      </Text>
      <div style={{ height: '400px', overflowY: 'auto' }}>
        <style>
          {`
          ::-webkit-scrollbar {
            width: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: darkgray;
          }

          ::-webkit-scrollbar-track {
            background-color: lightgray;
          }
        `}
        </style>
        <Divider my={1} mb={4} mr={3} width={50} borderColor="gray.300" />
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <NavItem
                item={item}
                activeIndex={activeIndex}
                index={index}
                setIsActive={() => handleActiveIndex(index)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};
