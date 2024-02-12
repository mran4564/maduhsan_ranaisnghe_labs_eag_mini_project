import { Box, Text } from '@chakra-ui/react';
import { HeaderProps, Renderer } from 'react-table';
import {
  columnMap,
  columnMapOrderItems,
  OrderItemResponse,
  OrderItemStatus,
} from '@b2b-app-mfe/services';

import React from 'react';

type OrderItemCellProps<T extends object> = {
  value: React.ReactNode;
  column: Renderer<HeaderProps<T>> | undefined;
  data: OrderItemResponse;
  row: {
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    original: Record<string, any>;
  };
};

export function OrderItemCell<T extends object>({
  value,
  row,
  column,
  data,
}: OrderItemCellProps<T>) {
  if (column === columnMapOrderItems.total) {
    return (
      <Box>
        <Text as="span">$</Text>
        {value}
      </Box>
    );
  } else if (column === columnMap.ApproveStatus) {
    return StatusDisplay(data.status);
  }
  return <Box>{value}</Box>;
}

const StatusDisplay = (status: string) => {
  let backgroundColor;

  switch (status) {
    case OrderItemStatus.CONFIRMED:
      backgroundColor = 'yellow.100';
      break;
    case OrderItemStatus.COMPLETE:
      backgroundColor = 'green.100';
      break;
    case OrderItemStatus.REJECTED:
      backgroundColor = 'red.100';
      break;
    case OrderItemStatus.UNCONFIRMED:
      backgroundColor = 'gray.100';
      break;
    default:
      backgroundColor = 'white';
      break;
  }

  return (
    <Box
      display="inline-block"
      padding="1"
      borderRadius="2"
      bg={backgroundColor}
    >
      <Text>{status}</Text>
    </Box>
  );
};
