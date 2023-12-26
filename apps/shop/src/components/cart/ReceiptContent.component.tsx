import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { OrderResponse } from '@b2b-app-mfe/services';

export type ReciptProps = {
  orderDetails: OrderResponse;
};

const Receipt = ({ orderDetails }: ReciptProps) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Order Details</Heading>
      <Text>Thank you for your order!</Text>

      <Box mt={4}>
        <Heading size="sm" mb={2}>
          Order Details
        </Heading>
        {orderDetails.orderItems.map((item) => (
          <Box
            my={4}
            key={item.productId}
            display="flex"
            justifyContent="space-between"
          >
            <Text>{item.productId}</Text>
            <Text>${item.total.toFixed(2)}</Text>
          </Box>
        ))}
      </Box>

      <Box mt={8} display="flex" justifyContent="space-between">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight={'bold'}>${orderDetails.totalPrice.toFixed(2)}</Text>
      </Box>
    </Box>
  );
};

export default Receipt;
