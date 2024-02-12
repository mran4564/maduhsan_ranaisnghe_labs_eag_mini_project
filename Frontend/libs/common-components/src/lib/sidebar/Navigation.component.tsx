import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react';
import { NavItem } from './NavItem.component';
import { useState } from 'react';

export interface MenuItem {
  label: string;
  path: string;
}

type NavaigationProps = {
  title: string;
  categoryItems: MenuItem[];
  height?: string;
};

export const Navigation = ({
  title = '',
  categoryItems = [],
  height = '150px',
}: NavaigationProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <Box>
      <Text ml={4} fontSize={16} fontWeight={'bold'} color="gray.700">
        {title}
      </Text>
      <div style={{ height: `${height}`, overflowY: 'auto' }}>
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
        <Divider ml={4} my={1} mb={4} width={50} borderColor="gray.300" />
        <List>
          {categoryItems.map((item, index) => (
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
