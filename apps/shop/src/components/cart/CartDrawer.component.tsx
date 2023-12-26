import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Box,
  Stack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { CartItem } from './CartItem.component';
import { CartOrderSummary } from './CartOrderSummary.component';
import { FaArrowRight } from 'react-icons/fa';
import { CartSlice } from 'global-store/Module';
import {
  CartResponse,
  CreateOrderRequest,
  OrderItemRequest,
  OrderResponse,
  updateCartItemRequestDto,
} from '@b2b-app-mfe/services';
import { UseCart } from '@b2b-app-mfe/services';
import loadSession from '../../utils/sessionData';
import { OrderSummaryModal } from './ReciptModal.component';

const CartDrawer = () => {
  const { cartStatus, hideCart } = CartSlice();
  const [cartDetails, setCartDetails] = useState<CartResponse>({
    cartItems: [],
    cartId: '',
    total: 0.0,
    customerId: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderResponse>();
  const { userId } = loadSession();
  const { data, isLoading, error, getData, updateItem, deleteItem, postOrder } =
    UseCart<CartResponse>({
      params: {
        customer_id: String(userId),
      },
    });

  const toast = useToast();

  useEffect(() => {
    if (data) {
      console.log(data);
      setCartDetails(data);
    }
  }, [data]);

  useEffect(() => {
    if (cartStatus) {
      getData();
    }
  }, [cartStatus]);

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

  const updateCartItemQuantity = (
    value: number,
    cartItemId: string,
    price: number
  ) => {
    console.log(value, cartItemId);
    const cartItemUpdate: updateCartItemRequestDto = {
      quantity: value,
      unitPrice: price,
    };
    updateItem(cartItemId, cartItemUpdate);
    setTimeout(() => {}, 1000);
  };

  const removeCartItem = (cartItemId: string) => {
    deleteItem(cartItemId);
    setTimeout(() => {}, 1000);
  };

  const openOrderModal = () => {
    setModalOpen(true);
    hideCart();
  };

  const closeOrderModal = () => {
    setModalOpen(false);
  };

  const submitOrder = async () => {
    const orderRequest: CreateOrderRequest = {
      customerId: cartDetails.customerId,
      orderItemRequests: cartDetails.cartItems.map((cartItem) => {
        const orderItem: OrderItemRequest = {
          productId: cartItem.productId,
          unitPrice: cartItem.unitPrice,
          supplierId: userId,
          quantity: cartItem.quantity,
        };
        return orderItem;
      }),
      deliveryAddress: '',
    };
    const orderData = await postOrder(orderRequest);
    if (orderData) {
      setOrderData(orderData);
    }
    openOrderModal();
  };

  return (
    <div>
      <Drawer isOpen={cartStatus} onClose={hideCart} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader fontSize="xl" fontWeight="bold">
            Shopping Cart ({cartDetails.cartItems.length} items)
          </DrawerHeader>

          <DrawerBody>
            <Box height="100%" position="relative">
              {/* Loading Spinner (conditionally rendered) */}
              {isLoading && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  bg="rgba(255, 255, 255, 0.8)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  zIndex="999"
                >
                  <Spinner size="lg" color="teal.500" />
                </Box>
              )}
              <Box overflowY="scroll" maxHeight="80%" mb={2}>
                <Stack p={2} spacing="3">
                  {cartDetails.cartItems.map((item) => (
                    <CartItem
                      key={item.cartItemId}
                      {...item}
                      onChangeQuantity={updateCartItemQuantity}
                      removeFromCart={() => removeCartItem(item.cartItemId)}
                    />
                  ))}
                </Stack>
              </Box>
              <Box></Box>
              <Box height="20%">
                {data ? <CartOrderSummary cartData={data} /> : <div></div>}
              </Box>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button
              boxShadow={'md'}
              width={'full'}
              colorScheme="teal"
              size="lg"
              fontSize="md"
              onClick={() => submitOrder()}
              rightIcon={<FaArrowRight />}
            >
              Checkout
            </Button>
            <Button
              boxShadow={'md'}
              bgColor={'gray.200'}
              ml={2}
              variant="outline"
              size="lg"
              onClick={hideCart}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {orderData ? (
        <OrderSummaryModal
          isOpen={modalOpen}
          onClose={() => closeOrderModal()}
          orderData={orderData}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartDrawer;
