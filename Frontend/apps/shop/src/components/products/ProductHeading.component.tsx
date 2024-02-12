import { ProductQuery, useCategory } from '@b2b-app-mfe/services';
import { Flex, Heading } from '@chakra-ui/react';

interface Props {
  productQuery: ProductQuery;
}

const ProductHeading = ({ productQuery }: Props) => {
  const { data } = useCategory({});

  const category = data.find(
    (category) => category.categoryId === productQuery.category_id
  );
  const heading = `${category?.name || ''} ${
    productQuery.brand_name || ''
  } Products`;

  return (
    <Heading color={'gray.600'} mt={5} mb={3} fontSize="sm">
      <Flex alignItems={'center'}>
        {heading}
        {/* <Divider mx={5} width={'40%'} /> */}
      </Flex>
    </Heading>
  );
};

export default ProductHeading;
