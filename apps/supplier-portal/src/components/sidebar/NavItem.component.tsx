import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { CategoryItem } from './Navigation.component';
import { useNavigate } from 'react-router-dom';

type NavItemProps = {
  item: CategoryItem;
  activeIndex: number;
  index: number;
  setIsActive: (index: number) => void;
};

export const NavItem = ({
  item,
  activeIndex,
  index,
  setIsActive,
}: NavItemProps) => {
  const navigate = useNavigate();
  const { label, path } = item;

  const handleClick = (index: number) => {
    setIsActive(index);
    navigate(path, { replace: true });
  };

  return (
    <Box display="flex" alignItems="center" my={1} justifyContent="center">
      <Box
        onClick={() => handleClick(index)}
        border={8}
        gap={1}
        borderRadius={10}
        display="flex"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
          color: 'black',
          bg: 'gray.100',
          cursor: 'pointer',
        }}
        fontWeight="semibold"
        fontSize={12}
        color={activeIndex === index ? 'black' : 'gray.400'}
        w="90%"
        justifyContent={''}
      >
        <Text my={1} pl={2}>
          {label}
        </Text>
      </Box>
    </Box>
  );
};
