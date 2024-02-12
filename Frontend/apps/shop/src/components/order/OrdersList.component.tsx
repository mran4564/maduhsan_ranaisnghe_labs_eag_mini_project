import { AccordionPanel, Badge, Box, Skeleton } from '@chakra-ui/react';

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Text,
} from '@chakra-ui/react';
import OrderItems from './OrderItems.component';
import { OrderResponse, useOrdersCustomers } from '@b2b-app-mfe/services';
import loadSession from '../../utils/sessionData';

const OrdersList = () => {
  const { userId } = loadSession();
  const { data, isLoading } = useOrdersCustomers(userId);

  return isLoading ? (
    <Box mt={14}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} height="30px" mt={4} />
      ))}
    </Box>
  ) : (
    <Box>
      <Text fontSize="md" m={4} fontWeight={'bold'}>
        Checkout your Orders!
      </Text>
      {data.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </Box>
  );
};

type OrderCardProps = {
  order: OrderResponse;
};

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem m={4} borderRadius={10} p={2} shadow={2}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text>
                Order ID: {order.orderId}{' '}
                <Badge colorScheme="teal" ml={2}>
                  Total: ${order.totalPrice}
                </Badge>
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <OrderItems orderItems={order.orderItems} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OrdersList;
