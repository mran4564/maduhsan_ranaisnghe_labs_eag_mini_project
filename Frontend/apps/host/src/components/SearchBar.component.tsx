import React from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  return (
    <Box padding={10}>
      <InputGroup>
        <Input
          width={500}
          type="text"
          placeholder="Search..."
          size="md"
          borderRadius="full"
          border="2px"
          borderColor="gray.200"
        />
        <InputRightElement>
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            colorScheme="blue"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
