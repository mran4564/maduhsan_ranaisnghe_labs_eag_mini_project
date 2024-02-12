import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ProductCardContainer = ({ children }: Props) => {
  return (
    <Box boxShadow={'sm'} m={1} width={220} height={300} borderRadius={5}>
      {children}
    </Box>
  );
};

export default ProductCardContainer;
