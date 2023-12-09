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
} from '@chakra-ui/react';
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';
import { CategoryData, getAllCategory } from '../../api/category.api';
import { createProduct } from '../../api/products.api';
import { useNavigate } from 'react-router-dom';

const ProductCreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stockCount: 0,
    imageUrl:
      'https://t3.ftcdn.net/jpg/02/06/45/54/360_F_206455496_BStGIyW9AcinRXNqgwn3hPYahiwm7iL9.jpg', // Updated key to imageUrl
    category: '',
  });
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const getData = async () => {
    const data = await getAllCategory();
    const category = data[0].name;
    setCategories(data);
    setFormData((prevData) => ({
      ...prevData,
      category,
    }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) => {
    try {
      setIsLoading(true);

      // Simulate the actual S3 upload process, replace this with your S3 upload logic
      const imageUrl = await uploadToS3(acceptedFiles);

      setFormData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToS3 = async (file: FileWithPath[]) => {
    // Replace this with your S3 upload logic
    // The actual implementation will depend on your server/backend setup
    // For simplicity, this example returns a placeholder S3 link
    return 'https://your-s3-bucket-url.com/' + file[0].name;
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Allow multiple file selection
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
      categories.find((item) => item.name === formData.category)?.categoryId ??
      '';
    const product = { ...formData, categoryId };
    return product;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const data = getFormData();
    const userData = sessionStorage.getItem('userData') ?? '';
    const { userId } = JSON.parse(userData);
    const { category, ...product } = data;
    const supplierId = userId;
    const response = await createProduct({ ...product, supplierId });
    setIsLoading(false);
    if (response) {
      navigate('/products');
    }
  };

  return (
    <Box ml={4} p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start">
          <HStack>
            <Box width={'70%'}>
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
                      src={formData.imageUrl}
                      alt="Product"
                      maxH="200px" // Adjust the max height as needed
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

          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((option) => (
                <option key={option.categoryId} value={option.name}>
                  {option.name}
                </option>
              ))}
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
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
