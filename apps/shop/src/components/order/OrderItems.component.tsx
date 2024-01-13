import { OrderItemResponse } from '@b2b-app-mfe/services';
import { Box, Text } from '@chakra-ui/react';

type OrderItemsProps = {
  orderItems: OrderItemResponse[];
};

const OrderItems = ({ orderItems }: OrderItemsProps) => {
  return (
    <Box mt={4}>
      {orderItems.map((item) => (
        <Box key={item.orderItemId} p={4} borderWidth="1px" borderRadius="md">
          <Text>
            Product ID: {item.productId} - Quantity: {item.quantity} - Total: $
            {item.total} - Status: {item.status}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default OrderItems;
