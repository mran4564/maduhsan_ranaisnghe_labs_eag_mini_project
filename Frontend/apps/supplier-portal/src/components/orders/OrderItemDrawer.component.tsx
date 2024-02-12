import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Button,
  DrawerFooter,
  CircularProgress,
  Select,
  useToast,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import {
  OrderItemApi,
  OrderItemResponse,
  OrderItemStatus,
  ProductApi,
  ProductResponse,
  UpdateOrderItemStatusRequestDto,
  useGet,
  usePatch,
} from '@b2b-app-mfe/services';

export type OrderItemDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  orderItemData: OrderItemResponse;
  setData: () => void;
};

const OrderItemDrawer = ({
  isOpen,
  onClose,
  orderItemData,
  setData,
}: OrderItemDrawerProps) => {
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
    getData,
  } = useGet<ProductResponse>(
    ProductApi.getProductById(orderItemData.productId)
  );
  const {
    postData,
    isLoading: submitLoading,
    error: submitError,
  } = usePatch(OrderItemApi.updateOrderItem(orderItemData.orderItemId));
  const toast = useToast();
  const [orderItemStatus, setOrderItemStatus] = useState(
    OrderItemStatus.COMPLETE
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderItemStatus(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (submitError) {
      toast({
        position: 'bottom-right',
        description: submitError,
        status: 'error',
        isClosable: true,
      });
      if (productError) {
        toast({
          position: 'bottom-right',
          description: productError,
          status: 'error',
          isClosable: true,
        });
      }
    }
  }, [submitError, productError]);

  const handleSubmit = async (productStatus: string) => {
    const request: UpdateOrderItemStatusRequestDto = {
      orderItemStatus: orderItemStatus,
    };
    console.log(request);
    const result = await postData(request);
    if (result) {
      setData();
      onClose();
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex justify="space-between">
            <Box>
              <Box pl={3}>{orderItemData.orderItemId}</Box>
              <Box pl={3} fontSize={12}>
                {productData?.productId ?? ''}
              </Box>
            </Box>
            <Select
              mt={2}
              defaultValue={orderItemStatus}
              boxShadow={'md'}
              borderRadius={7}
              focusBorderColor={'gray.200'}
              width={40}
              onChange={handleChange}
              size="md"
            >
              <option value={OrderItemStatus.COMPLETE}>Completed</option>
              <option value={OrderItemStatus.CONFIRMED}>Confirmed</option>
              <option value={OrderItemStatus.UNCONFIRMED}>Unconfirmed</option>
              <option value={OrderItemStatus.REJECTED}>Reject</option>
            </Select>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {productLoading && (
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
          <Image
            ml={5}
            src={
              productData?.imageUrl === ''
                ? 'https://img.freepik.com/free-photo/macaroni-noodles-with-meat-tomato-sauce-served-plate-table_1220-6904.jpg'
                : productData?.imageUrl
            }
            borderRadius={8}
            alt="Product"
            width={'70%'}
            maxH="200px" // Adjust the max height as needed
          />
          <Table fontSize={14} variant="simple">
            <Tbody>
              <Tr>
                <Td>Product Name:</Td>
                <Td>{productData?.name}</Td>
              </Tr>
              <Tr>
                <Td>Quentity:</Td>
                <Td>{orderItemData.quantity}</Td>
              </Tr>
              <Tr>
                <Td>Total Price:</Td>
                <Td>
                  <Box>
                    <Text as="span">$</Text>
                    {orderItemData.total}
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Status:</Td>
                <Td>{orderItemData.status}</Td>
              </Tr>
            </Tbody>
          </Table>
        </DrawerBody>
        <DrawerFooter>
          <Button
            boxShadow={'md'}
            width={'full'}
            onClick={() => handleSubmit(orderItemStatus)}
            colorScheme={'teal'}
            size="lg"
            fontSize="md"
          >
            {submitLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Update Status'
            )}
          </Button>
          <Button
            boxShadow={'md'}
            bgColor={'gray.200'}
            ml={2}
            variant="outline"
            size="lg"
            onClick={onClose}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderItemDrawer;
