import { Box, Flex, Text } from '@chakra-ui/react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { HeaderProps, Renderer } from 'react-table';
import { columnMap, ProductApproveStatusEnum } from '@b2b-app-mfe/services';

import React from 'react';
import { ProductResponse } from '@b2b-app-mfe/services';

type CustomCellProps<T extends object> = {
  value: React.ReactNode;
  column: Renderer<HeaderProps<T>> | undefined;
  data: ProductResponse;
  row: {
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    original: Record<string, any>;
  };
};

export function CustomCell<T extends object>({
  value,
  row,
  column,
  data,
}: CustomCellProps<T>) {
  if (column === columnMap.Availabilty) {
    return (
      <Flex align="center">
        {value ? (
          <>
            <IoMdCheckmark style={{ color: 'green', marginRight: '4px' }} />
            <Text color={'green'}>Available</Text>
          </>
        ) : (
          <>
            <IoMdClose style={{ color: 'red', marginRight: '4px' }} />
            <Text color="red">Not Available</Text>
          </>
        )}
      </Flex>
    );
  } else if (column === columnMap.Price) {
    return (
      <Box>
        <Text as="span">$</Text>
        {value}
      </Box>
    );
  } else if (column === columnMap.ApproveStatus) {
    return StatusDisplay(data.isApproved || '');
  }
  return <Box>{value}</Box>;
}

const StatusDisplay = (status: string) => {
  let backgroundColor;

  switch (status) {
    case ProductApproveStatusEnum.PENDING:
      backgroundColor = 'yellow.100';
      break;
    case ProductApproveStatusEnum.APPROVED:
      backgroundColor = 'green.100';
      break;
    case ProductApproveStatusEnum.REJECTED:
      backgroundColor = 'red.100';
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
