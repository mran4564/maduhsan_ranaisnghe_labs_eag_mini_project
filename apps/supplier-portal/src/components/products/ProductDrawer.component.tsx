import React, { useState } from 'react';
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
  Input,
  Button,
  IconButton,
  DrawerFooter,
} from '@chakra-ui/react';
import { UnlockIcon, LockIcon } from '@chakra-ui/icons';
import { Product } from '../../api/products.api';

export type ProductPreviewDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  productData: Product;
};

const ProductPreviewDrawer = ({
  isOpen,
  onClose,
  productData,
}: ProductPreviewDrawerProps) => {
  const [isEditing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(productData);

  const handleToggleEditing = () => {
    setEditing(!isEditing);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string | boolean };
  }) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', editedProduct);
    setEditing(false);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Box>{productData.name}</Box>
          <Box fontSize={12}>{productData.productId}</Box>
        </DrawerHeader>
        <DrawerBody>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Product Name:</Td>
                <Td>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    productData.name
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Stock Count:</Td>
                <Td>
                  {isEditing ? (
                    <Input
                      name="stockCount"
                      value={productData.stockCount}
                      onChange={handleInputChange}
                    />
                  ) : (
                    productData.stockCount
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Availability:</Td>
                <Td>
                  {isEditing ? (
                    <Input
                      name="availability"
                      value={productData.instock}
                      onChange={handleInputChange}
                    />
                  ) : (
                    productData.instock
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </DrawerBody>
        <DrawerFooter>
          <Box>
            {isEditing ? (
              <Box>
                <Button colorScheme="red" mr={2} onClick={handleToggleEditing}>
                  Cancel
                </Button>
                <Button colorScheme="green" mr={2} onClick={handleSaveChanges}>
                  Update Product
                </Button>
              </Box>
            ) : (
              <IconButton
                icon={isEditing ? <LockIcon /> : <UnlockIcon />}
                colorScheme={isEditing ? 'red' : 'green'}
                aria-label={isEditing ? 'Lock' : 'Unlock'}
                onClick={handleToggleEditing}
              />
            )}
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductPreviewDrawer;
