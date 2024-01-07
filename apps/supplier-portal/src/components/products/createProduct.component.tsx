import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  HStack,
  Image,
  useToast,
} from '@chakra-ui/react';
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';
import {
  ProductApi,
  useCategory,
  usePostWithCredentials,
} from '@b2b-app-mfe/services';

import { useNavigate } from 'react-router-dom';

const ProductCreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stockCount: 0,
    imageUrl:
      'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
    category: '',
  });
  const { data: categoryData } = useCategory({});
  const { postData, isLoading, error } = usePostWithCredentials(
    ProductApi.createProduct
  );
  const toast = useToast();
  const navigate = useNavigate();
  const category = categoryData[0] ? categoryData[0].name : '';

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category,
    }));
  }, [categoryData]);

  const onDrop = async (
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) => {
    try {
      const imageUrl = await uploadToS3(acceptedFiles);

      setFormData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    }
  };

  const uploadToS3 = async (file: FileWithPath[]) => {
    // Replace this with S3 upload logic
    return 'https://your-s3-bucket-url.com/' + file[0].name;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getFormData = () => {
    const categoryId: string =
      categoryData.find((item) => item.name === formData.category)
        ?.categoryId ?? '';
    const product = { ...formData, categoryId, inStock: true };
    return product;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = sessionStorage.getItem('userData') ?? '';
    const data = getFormData();
    const { userId } = JSON.parse(userData);
    const { category, ...product } = data;
    const supplierId = userId;
    const response = await postData({ ...product, supplierId });
    if (response) {
      navigate('/b2b-app/products');
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        position: 'bottom-right',
        description: error,
        status: 'error',
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Box width={'90%'} ml={4} p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start">
          <HStack>
            <Box width={'80%'}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl ml={4}>
                <FormLabel>Image</FormLabel>
                <div {...getRootProps()} style={{ width: '100%' }}>
                  <input {...getInputProps()} accept="image/*" />
                  {formData.imageUrl ? (
                    <Image
                      borderRadius={4}
                      boxShadow={'sm'}
                      src={formData.imageUrl}
                      alt="Product"
                      maxH="250px" // Adjust the max height as needed
                    />
                  ) : (
                    <Box
                      border="2px dashed #CBD5E0"
                      borderRadius="md"
                      p={4}
                      textAlign="center"
                    >
                      Drag 'n' drop an image here, or click to select one.
                    </Box>
                  )}
                </div>
              </FormControl>
            </Box>
          </HStack>

          <FormControl width={'60%'}>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categoryData.map((option) => (
                <option key={option.categoryId} value={option.name}>
                  {option.name}
                </option>
              ))}
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                min={0}
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <Button type="submit" colorScheme="teal" isLoading={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" colorScheme="gray">
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default ProductCreatePage;
