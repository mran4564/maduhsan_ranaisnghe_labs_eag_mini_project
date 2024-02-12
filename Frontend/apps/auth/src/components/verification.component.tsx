import { Box, Text } from '@chakra-ui/react';

const VerificationMessage = () => {
  return (
    <Box p={4} m={12}>
      <Text fontSize="20" fontWeight="bold">
        Verification Email Sent
      </Text>
      <Text mt={4}>
        The verification link has been sent to your email. Please check your
        email and follow the instructions to complete the verification process.
      </Text>
    </Box>
  );
};

export default VerificationMessage;
