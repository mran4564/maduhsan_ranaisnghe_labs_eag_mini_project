import { Box, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default Loading;
