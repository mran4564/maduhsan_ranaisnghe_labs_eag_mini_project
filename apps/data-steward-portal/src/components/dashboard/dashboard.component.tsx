import React from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Heading,
  Divider,
} from '@chakra-ui/react';

const overviewData = {
  totalOrders: 150,
  totalRevenue: '$50,000',
  averageOrderValue: '$333.33',
  recentActivity: [
    { action: 'New order', time: '2 hours ago' },
    { action: 'Shipped', time: '1 day ago' },
  ],
};

const Dashboard = () => {
  return (
    <Box p={4}>
      <Heading fontSize={22} mb={14}>
        Report Overview
      </Heading>

      {/* Overview Section */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={8}>
        <Stat>
          <StatLabel>Total Orders</StatLabel>
          <StatNumber>{overviewData.totalOrders}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            10% increase
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>{overviewData.totalRevenue}</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            5% decrease
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Average Order Value</StatLabel>
          <StatNumber>{overviewData.averageOrderValue}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            8% increase
          </StatHelpText>
        </Stat>
      </Grid>

      <Divider mb={8} />

      {/* Sales Analytics Section */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={8}></Grid>
    </Box>
  );
};

export default Dashboard;
