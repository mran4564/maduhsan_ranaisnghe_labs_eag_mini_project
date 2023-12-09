import { Box, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
    >
      <Spinner size="xl" color="blue.500" />
    </Box>
  );
};

export default Loader;
