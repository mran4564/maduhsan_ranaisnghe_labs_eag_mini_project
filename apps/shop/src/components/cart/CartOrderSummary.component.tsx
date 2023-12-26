import { CartResponse } from '@b2b-app-mfe/services';
import { Flex, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export interface CartOrderSummeryProps {
  cartData: CartResponse;
}

export const CartOrderSummary = ({ cartData }: CartOrderSummeryProps) => {
  const total = cartData.total ? cartData.total.toString() : '0.00';

  return (
    <Stack m={2} spacing="2" borderWidth="1px" rounded="md" padding="4">
      <Stack spacing="1">
        <OrderSummaryItem label="Subtotal" value={total} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="20" fontWeight="extrabold">
            ${cartData.total.toFixed(2)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
