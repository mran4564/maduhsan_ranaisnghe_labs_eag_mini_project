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
  DrawerFooter,
  Select,
  Button,
  CircularProgress,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import {
  ApproveProductRequest,
  ProductApproveStatusEnum,
  ProductResponse,
} from '@b2b-app-mfe/services';
import { PRODUCTS_API, usePatch } from '@b2b-app-mfe/services';

export type ProductPreviewDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  productData: ProductResponse;
  setData: () => void;
};

const ProductPreviewDrawer = ({
  isOpen,
  onClose,
  productData,
  setData,
}: ProductPreviewDrawerProps) => {
  const [productStatus, setProductStatus] = useState(
    ProductApproveStatusEnum.APPROVED
  );
  const { postData, isLoading, error } = usePatch(
    PRODUCTS_API + `/${productData.productId}`
  );
  const toast = useToast();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProductStatus(event.target.value);
    console.log(productStatus);
  };

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

  const handleSubmit = async (productStatus: string) => {
    const request: ApproveProductRequest = {
      approved: productStatus,
    };
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
              <Box pl={3}>{productData.name}</Box>
              <Box pl={3} fontSize={12}>
                {productData.productId}
              </Box>
            </Box>
            <Select
              mt={2}
              defaultValue={productStatus}
              boxShadow={'md'}
              borderRadius={7}
              focusBorderColor={'gray.200'}
              width={40}
              onChange={handleChange}
              size="md"
            >
              <option value={ProductApproveStatusEnum.APPROVED}>Approve</option>
              <option value={ProductApproveStatusEnum.REJECTED}>Reject</option>
              <option value={ProductApproveStatusEnum.PENDING}>Pending</option>
            </Select>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Image
            ml={5}
            src={
              productData.imageUrl === ''
                ? 'https://img.freepik.com/free-photo/macaroni-noodles-with-meat-tomato-sauce-served-plate-table_1220-6904.jpg'
                : productData.imageUrl
            }
            borderRadius={8}
            alt="Product"
            width={'70%'}
            maxH="200px" // Adjust the max height as needed
          />
          <Table fontSize={14} variant="simple">
            <Tbody>
              <Tr>
                <Td>{productData.description}</Td>
              </Tr>
              <Tr>
                <Td>Product Name:</Td>
                <Td>{productData.name}</Td>
              </Tr>
              <Tr>
                <Td>Stock Count:</Td>
                <Td>{productData.stockCount}</Td>
              </Tr>
              <Tr>
                <Td>Available:</Td>
                <Td>{productData.inStock ? 'Yes' : 'No'}</Td>
              </Tr>
            </Tbody>
          </Table>
        </DrawerBody>
        <DrawerFooter>
          <Button
            boxShadow={'md'}
            width={'full'}
            onClick={() => handleSubmit(productStatus)}
            colorScheme={'teal'}
            size="lg"
            fontSize="md"
            rightIcon={<FaArrowRight />}
          >
            {isLoading ? (
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

export default ProductPreviewDrawer;
