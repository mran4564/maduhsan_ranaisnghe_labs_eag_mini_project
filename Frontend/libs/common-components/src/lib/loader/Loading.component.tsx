import { Box, Spinner } from '@chakra-ui/react';

export type LoadingProps = {
  height?: string;
};

export const Loading = ({ height }: LoadingProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={height ?? '100vh'}
    >
      <Spinner size="xl" />
    </Box>
  );
};
