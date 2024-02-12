import {
  AddCartItemRequestDto,
  CartApi,
  ProductResponse,
  usePut,
} from '@b2b-app-mfe/services';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Text,
  Image,
  Stack,
  CircularProgress,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import loadSession from '../../utils/sessionData';

interface Props {
  product: ProductResponse;
}

const ProductCard = ({ product }: Props) => {
  const summarizedDescription = product.description
    ? product.description.slice(0, 80)
    : '';
  const { userId } = loadSession();
  const { putData, isLoading, error } = usePut(CartApi.AddItemToCart(userId));
  const toast = useToast();
  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        position: 'bottom-right',
        description: error,
        status: 'error',
        isClosable: true,
      });
    }
  }, [error]);

  const handleSubmit = () => {
    const cartData: AddCartItemRequestDto = {
      productId: product.productId,
      unitPrice: product.price,
      quantity: 1,
    };
    putData(cartData);
  };

  return (
    <Card height={300} width={220}>
      <CardBody p={2} height={250}>
        <Image
          width={220}
          src={product.imageUrl}
          alt="Green double couch with wooden legs"
          borderRadius={5}
        />
        <Stack mt="1" spacing="1">
          <Heading size="sm">{product.name}</Heading>
          <Text fontSize="10">{summarizedDescription}</Text>

          <Text color="gray.600" fontWeight={'bold'} fontSize="sm">
            ${product.price.toFixed(2)}
          </Text>
        </Stack>
      </CardBody>
      <Divider width={'98%'} borderColor="gray.200" borderWidth="2px" />
      <CardFooter p={2} justifyContent={'space-between'}>
        <ButtonGroup spacing="2">
          {isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            <Button
              variant="solid"
              size={'sm'}
              colorScheme="teal"
              onClick={() => handleSubmit()}
            >
              Add to cart
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
