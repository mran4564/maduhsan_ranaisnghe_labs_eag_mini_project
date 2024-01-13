import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { CartProductMeta } from './CartProductMeta.component';
import { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { ProductApi, ProductResponse, useGet } from '@b2b-app-mfe/services';

type CartItemProps = {
  cartItemId: string;
  productId: string;
  quantity: number;
  total: number;
  onChangeQuantity?: (
    quantity: number,
    cartItemId: string,
    price: number,
    productId: string
  ) => void;
  removeFromCart: () => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

type QuantityPickerProps = {
  value: number;
  onChange: (quantity: number) => void;
  loading?: boolean;
  removeFromCart?: () => void;
};

const QuantityPicker = ({
  value,
  onChange,
  loading,
  removeFromCart,
}: QuantityPickerProps) => {
  const [editedValue, setEditedValue] = useState(value);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const handleIncrement = () => {
    setShowUpdateButton(false);
    onChange(editedValue + 1);
    setEditedValue(editedValue + 1);
  };

  const handleDecrement = () => {
    setShowUpdateButton(false);
    if (value > 1) {
      onChange(editedValue - 1);
      setEditedValue(editedValue - 1);
    } else {
      removeFromCart?.();
    }
  };

  const handleInputChange = (e: { target: { value: string | number } }) => {
    setEditedValue(+e.target.value);
    setShowUpdateButton(true);
  };

  const handleUpdate = () => {
    onChange(editedValue);
    setShowUpdateButton(false);
  };
  const handleUpdateCancel = () => {
    setEditedValue(value);
    setShowUpdateButton(false);
  };

  return loading ? (
    <Button isLoading>...</Button>
  ) : (
    <InputGroup width="100" mt={5}>
      <Flex flexDirection="row" alignItems="center">
        <Button m={1} size="sm" onClick={handleDecrement}>
          -
        </Button>
        <Input
          size="sm"
          m={1}
          width={'10'}
          type="number"
          value={editedValue}
          onChange={handleInputChange}
          textAlign="center"
        />

        <Button size="sm" m={1} onClick={handleIncrement}>
          +
        </Button>
      </Flex>

      {showUpdateButton && (
        <Flex flexDirection="column" alignItems="center">
          <Button
            size="xs"
            m={1}
            bg={'white'}
            color={'teal.500'}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            size="xs"
            m={1}
            bg={'white'}
            color={'teal.500'}
            onClick={handleUpdateCancel}
          >
            cancel
          </Button>
        </Flex>
      )}
    </InputGroup>
  );
};

export const CartItem = (props: CartItemProps) => {
  const { data: product, error } = useGet<ProductResponse>(
    ProductApi.getProductById(props.productId)
  );
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        position: 'bottom-right',
        description: error,
        status: 'error',
        isClosable: true,
      });
    }
  }, [error]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      props.onChangeQuantity?.(
        newQuantity,
        props.cartItemId,
        product.price,
        product.productId
      );
    }
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius={10}
      p={2}
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      position="relative"
    >
      <IconButton
        size="xs"
        padding={2}
        colorScheme="gray"
        color={useColorModeValue('gray.800', 'gray.200')}
        aria-label="Delete"
        icon={<FaMinus size="xs" />}
        position="absolute"
        top="1"
        right="1"
        onClick={() => props.removeFromCart()} // Add your delete logic here
      />
      <CartProductMeta
        name={product?.name ?? ''}
        description={product?.description ?? ''}
        image={product?.imageUrl ?? ''}
        price={product?.price ?? 0}
      />
      <Flex
        width="200px"
        justify="space-between"
        display={{ base: 'none', md: 'flex' }}
      >
        <QuantityPicker
          value={props.quantity}
          onChange={handleQuantityChange}
          loading={false}
          removeFromCart={() => props.removeFromCart()}
        />
      </Flex>
    </Flex>
  );
};
