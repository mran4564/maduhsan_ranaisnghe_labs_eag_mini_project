import axios from 'axios';
import { Request } from 'express';
import { ProductCreateDTO, ProductUpdateDTO } from '../model/product.model';
import config from '../config/config';

class ProductService {
  async createProduct(productDTO: ProductCreateDTO) {
    const result = await axios.post(config.productApi, productDTO);
    return result;
  }
  async getProducts(req: Request) {
    const { page, size, category_id, brand_name, in_stock } = req.query;
    const response = await axios.get(config.productApi, {
      params: {
        page,
        size,
        category_id,
        brand_name,
        in_stock,
      },
    });
    return response.data.content;
  }
  async getProductById(productId: string) {
    const response = await axios.get(config.productApi + `/${productId}`);
    return response.data;
  }
  async updateProduct(productId: string, productDTO: ProductUpdateDTO) {
    const result = await axios.put(config.productApi + `/${productId}`, productDTO);
    return result.data;
  }

  async deleteProduct(productId: string) {
    const result = await axios.delete(config.productApi + `/${productId}`);
    return result.data;
  }
}

export default ProductService;
