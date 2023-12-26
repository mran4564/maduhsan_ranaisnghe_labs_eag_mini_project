import { Box, SimpleGrid } from '@chakra-ui/react';
import {
  ProductApproveStatusEnum,
  useProductsCustomers,
} from '@b2b-app-mfe/services';
import ProductCardContainer from './ProductCardContainer.component';
import ProductCardSkeleton from './ProductCardSkeleton.component';
import ProductCard from './ProductCard.component';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductHeading from './ProductHeading.component';
import CartDrawer from '../cart/CartDrawer.component';

const ProductGrid = () => {
  const { category_id } = useParams();
  const { data, error, isLoading } = useProductsCustomers(
    {
      page: 0,
      category_id: category_id,
      status: ProductApproveStatusEnum.APPROVED,
    },
    category_id ?? ''
  );
  useEffect(() => {}, [category_id]);

  if (error) {
    <div>{error}</div>;
  }

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Box>
      <div style={{ height: '520px', overflowY: 'auto', overflowX: 'hidden' }}>
        <style>
          {`
          ::-webkit-scrollbar {
            width: 0.5px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: darkgray;
          }

          ::-webkit-scrollbar-track {
            background-color: lightgray;
          }
        `}
        </style>
        <Box paddingLeft={2}>
          <ProductHeading productQuery={{ page: 0, category_id }} />
        </Box>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          padding="5px"
          spacing={3}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <ProductCardContainer key={skeleton}>
                <ProductCardSkeleton />
              </ProductCardContainer>
            ))}
          {data.map((product) => (
            <ProductCardContainer key={product.productId}>
              <ProductCard product={product} />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      </div>
      <CartDrawer />
    </Box>
  );
};

export default ProductGrid;
