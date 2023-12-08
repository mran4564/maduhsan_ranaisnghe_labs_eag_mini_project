'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Links: string[] = [];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={4}
      py={1}
      rounded={'sm'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.300', 'gray.500'),
      }}
      fontSize={'sm'}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOut = (basePath = '/') => {
    console.log('Logging out');

    // Clear session storage
    sessionStorage.clear();
    // Navigate to the base path
    navigate(basePath);
  };

  return (
    <Box bg={'white'} px={8} boxShadow="sm">
      <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack mt={0} spacing={6} alignItems={'center'}>
          <Text fontSize="xl" color="teal.500" fontWeight="bold">
            SYSCO SHOP
          </Text>
          <HStack as={'nav'} spacing={3} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Box mr={'8'}>
            <button>
              <FaShoppingCart size={16} />
            </button>
          </Box>
          <Menu size={'sm'}>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList fontSize={'sm'}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Orders</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
