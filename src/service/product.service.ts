import axios, { AxiosResponse } from 'axios';
import { ProductCreateDTO, ProductUpdateDTO } from '../model/product.model';
import config from '../config/config';

class ProductService {
  async createProduct(productDTO: ProductCreateDTO): Promise<AxiosResponse<any, any>> {
    const response = await axios.get(config.productApi, { params: productDTO });
    return response;
  }

  // async getProducts(): Promise<Product[]> {
  //   // Implement your logic to retrieve products from the database
  //   // Return an array of products
  //   const products: Product[] = [
  //     { id: '1', name: 'Product 1', description: 'Description 1', price: 19.99 },
  //     { id: '2', name: 'Product 2', description: 'Description 2', price: 29.99 },
  //     // Add more products as needed
  //   ];
  //   return products;
  // }

  // async getProductById(productId: string): Promise<Product | null> {
  //   // Implement your logic to retrieve a product by ID from the database
  //   // Return the product or null if not found
  //   const product: Product | null = {
  //     id: '1',
  //     name: 'Product 1',
  //     description: 'Description 1',
  //     price: 19.99,
  //   };
  //   return product;
  // }

  // async updateProduct(productId: string, productDTO: ProductUpdateDTO): Promise<boolean> {
  //   // Implement your logic to update a product in the database
  //   // Return true if the update is successful, false otherwise
  //   const updated = true;
  //   return updated;
  // }

  // async deleteProduct(productId: string): Promise<boolean> {
  //   // Implement your logic to delete a product from the database
  //   // Return true if the deletion is successful, false otherwise
  //   const deleted = true;
  //   return deleted;
  // }
}

export default ProductService;
